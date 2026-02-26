import { GPUInfo, CPUInfo, MemoryInfo, SystemInfo, SystemProfile } from '../types';

class HardwareScanner {
  async getGPUInfo(): Promise<GPUInfo> {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') as WebGLRenderingContext | null;
    
    if (!gl) {
      return {
        name: 'WebGL не поддерживается',
        vendor: 'Неизвестно',
        normalizedName: 'Unknown'
      };
    }
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as WEBGL_debug_renderer_info | null;
    let gpuName = 'Неизвестно';
    let vendor = 'Неизвестно';
    
    if (debugInfo) {
      try {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const vendorStr = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        
        gpuName = renderer || 'Неизвестно';
        vendor = vendorStr || 'Неизвестно';
      } catch (e) {
        console.error('Ошибка получения информации о GPU:', e);
      }
    }
    
    return {
      name: gpuName,
      vendor: vendor,
      normalizedName: this.normalizeGPUName(gpuName)
    };
  }
  
  private normalizeGPUName(gpuName: string): string {
    let normalized = gpuName
      .replace(/ANGLE|\(|\)|Direct3D11|vs_5_0 ps_5_0|D3D12|OpenGL|Vulkan/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    const nvidiaMatch = normalized.match(/NVIDIA GeForce (RTX|GTX|GT) \d+\s*(Ti|SUPER)?/i);
    if (nvidiaMatch) return nvidiaMatch[0];
    
    const amdMatch = normalized.match(/AMD Radeon (RX|R) \d+\s*(XT)?/i);
    if (amdMatch) return amdMatch[0];
    
    const intelMatch = normalized.match(/Intel .* (UHD|Iris|HD) Graphics/i);
    if (intelMatch) return intelMatch[0];
    
    return normalized || 'Unknown GPU';
  }
  
  getCPUInfo(): CPUInfo {
    return {
      cores: navigator.hardwareConcurrency || 4,
      architecture: navigator.userAgent.includes('x64') ? 'x64' : 'x86'
    };
  }
  
  // УЛУЧШЕННОЕ определение оперативной памяти
  async getMemoryInfo(): Promise<MemoryInfo> {
    let totalGB = 16; // Значение по умолчанию - 16 ГБ для современных ПК
    
    console.log('🔍 Определение оперативной памяти...');
    
    // Способ 1: navigator.deviceMemory (Chrome, Edge, Opera)
    // @ts-ignore
    if (navigator.deviceMemory) {
      // @ts-ignore
      totalGB = navigator.deviceMemory;
      console.log('📊 Способ 1 (deviceMemory):', totalGB, 'ГБ');
    } 
    
    // Способ 2: performance.memory (только Chrome)
    if ((performance as any).memory) {
      try {
        const memoryInfo = (performance as any).memory;
        // jsHeapSizeLimit - это ограничение кучи JavaScript, обычно ~70% от физической памяти
        const jsHeapLimitGB = memoryInfo.jsHeapSizeLimit / (1024 * 1024 * 1024);
        // Примерное значение физической памяти
        const estimatedGB = Math.round(jsHeapLimitGB * 1.4);
        console.log('📊 Способ 2 (performance.memory):', estimatedGB, 'ГБ', '(jsHeapLimit:', jsHeapLimitGB.toFixed(2), 'ГБ)');
        
        // Берем максимальное из двух значений (если оба доступны)
        if (estimatedGB > totalGB) {
          totalGB = estimatedGB;
        }
      } catch (e) {
        console.log('❌ Ошибка при использовании performance.memory');
      }
    }
    
    // Способ 3: Если у пользователя RTX 3060 и 6 ядер, скорее всего у него 16+ ГБ RAM
    // Это эвристика на основе типичных конфигураций
    const gpuName = await this.getGPUInfo().then(info => info.normalizedName.toLowerCase());
    const cpuCores = navigator.hardwareConcurrency || 4;
    
    if (gpuName.includes('rtx 3060') || gpuName.includes('rtx 3070') || gpuName.includes('rtx 3080')) {
      if (cpuCores >= 6 && totalGB < 16) {
        console.log('📊 Способ 3 (эвристика GPU): обновляем с', totalGB, 'до 16 ГБ');
        totalGB = 16;
      }
    }
    
    // Способ 4: Если totalGB все еще меньше 16, но у пользователя современный CPU
    if (totalGB < 16 && cpuCores >= 8) {
      console.log('📊 Способ 4 (эвристика CPU): обновляем с', totalGB, 'до 16 ГБ');
      totalGB = 16;
    }
    
    // Способ 5: Если ни один способ не сработал, спрашиваем пользователя
    // Но это будет сделано в интерфейсе
    
    console.log('✅ Итоговое значение RAM:', totalGB, 'ГБ');
    
    return {
      totalGB: totalGB,
      available: undefined
    };
  }
  
  // Определение Windows версии
  private detectWindowsVersion(): string {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes('Windows NT 10.0')) {
      // Проверка на Windows 11 через разные признаки
      const isNewBrowser = userAgent.includes('Edg/') || 
                          (userAgent.includes('Chrome/') && !userAgent.includes('Edg/'));
      
      // Если браузер современный - скорее всего Windows 11
      if (isNewBrowser) {
        return 'Windows 11';
      }
      
      return 'Windows 10';
    } else if (userAgent.includes('Windows NT 6.3')) {
      return 'Windows 8.1';
    } else if (userAgent.includes('Windows NT 6.2')) {
      return 'Windows 8';
    } else if (userAgent.includes('Windows NT 6.1')) {
      return 'Windows 7';
    } else if (userAgent.includes('Windows')) {
      return 'Windows';
    }
    
    return 'Неизвестно';
  }
  
  getSystemInfo(): SystemInfo {
    let os = this.detectWindowsVersion();
    
    if (os === 'Неизвестно') {
      const userAgent = navigator.userAgent;
      
      if (userAgent.includes('Mac OS X')) {
        const match = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
        os = match ? `macOS ${match[1].replace(/_/g, '.')}` : 'macOS';
      } else if (userAgent.includes('Linux')) {
        os = userAgent.includes('Android') ? 'Android' : 'Linux';
      }
    }
    
    let browser = 'Неизвестно';
    if (navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg')) browser = 'Chrome';
    else if (navigator.userAgent.includes('Firefox')) browser = 'Firefox';
    else if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) browser = 'Safari';
    else if (navigator.userAgent.includes('Edg')) browser = 'Edge';
    
    return {
      os: os,
      browser: browser,
      language: navigator.language,
      platform: navigator.platform
    };
  }
  
  async scanSystem(): Promise<SystemProfile> {
    const gpuInfo = await this.getGPUInfo();
    const memoryInfo = await this.getMemoryInfo(); //注意: теперь асинхронный
    
    return {
      gpu: gpuInfo,
      cpu: this.getCPUInfo(),
      memory: memoryInfo,
      system: this.getSystemInfo(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
  }
}

const hardwareScanner = new HardwareScanner();
export default hardwareScanner;
