import { GPUInfo, CPUInfo, MemoryInfo, SystemInfo, SystemProfile } from '../types';

class HardwareScanner {
  async getGPUInfo(): Promise<GPUInfo> {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return {
        name: 'WebGL не поддерживается',
        vendor: 'Неизвестно',
        normalizedName: 'Unknown'
      };
    }
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    let gpuName = 'Неизвестно';
    let vendor = 'Неизвестно';
    
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const vendorStr = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      
      gpuName = renderer || 'Неизвестно';
      vendor = vendorStr || 'Неизвестно';
    }
    
    return {
      name: gpuName,
      vendor: vendor,
      normalizedName: this.normalizeGPUName(gpuName)
    };
  }
  
  private normalizeGPUName(gpuName: string): string {
    let normalized = gpuName
      .replace(/ANGLE|\(|\)|Direct3D11|vs_5_0 ps_5_0|D3D12/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    const nvidiaMatch = normalized.match(/NVIDIA GeForce (RTX|GTX|GT) \d+/);
    if (nvidiaMatch) return nvidiaMatch[0];
    
    const amdMatch = normalized.match(/AMD Radeon (RX|R) \d+/);
    if (amdMatch) return amdMatch[0];
    
    const intelMatch = normalized.match(/Intel .* (UHD|Iris|HD) Graphics/);
    if (intelMatch) return intelMatch[0];
    
    return normalized;
  }
  
  getCPUInfo(): CPUInfo {
    return {
      cores: navigator.hardwareConcurrency || 4,
      architecture: navigator.userAgent.includes('x64') ? 'x64' : 'x86'
    };
  }
  
  getMemoryInfo(): MemoryInfo {
    // @ts-ignore - экспериментальный API
    const deviceMemory = navigator.deviceMemory;
    
    return {
      totalGB: deviceMemory || 8,
      available: undefined
    };
  }
  
  getSystemInfo(): SystemInfo {
    const userAgent = navigator.userAgent;
    let os = 'Неизвестно';
    
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';
    
    let browser = 'Неизвестно';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    return {
      os: os,
      browser: browser,
      language: navigator.language,
      platform: navigator.platform
    };
  }
  
  async scanSystem(): Promise<SystemProfile> {
    const gpuInfo = await this.getGPUInfo();
    
    return {
      gpu: gpuInfo,
      cpu: this.getCPUInfo(),
      memory: this.getMemoryInfo(),
      system: this.getSystemInfo(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
  }
}

export default new HardwareScanner();
