import { SystemProfile, CompatibilityResult, ComponentCheck, Recommendation, SoftwareRequirements } from '../types';

class CompatibilityService {
  private softwareDatabase: Map<string, SoftwareRequirements>;

  constructor() {
    this.softwareDatabase = new Map();
    this.initDatabase();
  }

  private initDatabase() {
    // Тестовые данные для демонстрации
    const cyberpunk: SoftwareRequirements = {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077',
      category: 'game',
      gpu: {
        model: 'NVIDIA GeForce GTX 1060',
        minPerformanceScore: 8500,
        vram: 6
      },
      cpu: {
        minCores: 4,
        minPerformanceScore: 6500
      },
      ram: {
        minGB: 12
      },
      os: {
        name: 'Windows 10',
        version: '1909'
      }
    };

    const bg3: SoftwareRequirements = {
      id: 'bg3',
      name: "Baldur's Gate 3",
      category: 'game',
      gpu: {
        model: 'NVIDIA GeForce GTX 970',
        minPerformanceScore: 7000,
        vram: 4
      },
      cpu: {
        minCores: 4,
        minPerformanceScore: 5500
      },
      ram: {
        minGB: 8
      },
      os: {
        name: 'Windows 10'
      }
    };

    const photoshop: SoftwareRequirements = {
      id: 'photoshop',
      name: 'Adobe Photoshop',
      category: 'professional',
      gpu: {
        model: 'NVIDIA GeForce GTX 1050',
        minPerformanceScore: 5000,
        vram: 2
      },
      cpu: {
        minCores: 4,
        minPerformanceScore: 4500
      },
      ram: {
        minGB: 8
      },
      os: {
        name: 'Windows 10'
      }
    };

    this.softwareDatabase.set('cyberpunk-2077', cyberpunk);
    this.softwareDatabase.set('bg3', bg3);
    this.softwareDatabase.set('photoshop', photoshop);
  }

  // Временная функция для получения рейтинга GPU (в реальном проекте - из базы данных)
  private getGPURating(model: string): number {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('rtx 4090')) return 35000;
    if (modelLower.includes('rtx 4080')) return 28000;
    if (modelLower.includes('rtx 4070')) return 22000;
    if (modelLower.includes('rtx 4060')) return 16000;
    if (modelLower.includes('rtx 3060')) return 12000;
    if (modelLower.includes('rtx 2060')) return 9000;
    if (modelLower.includes('gtx 1660')) return 8000;
    if (modelLower.includes('gtx 1060')) return 6500;
    if (modelLower.includes('gtx 1050')) return 4500;
    return 3000; // Базовый рейтинг для неизвестных
  }

  async checkCompatibility(
    systemProfile: SystemProfile,
    softwareId: string
  ): Promise<CompatibilityResult> {
    const requirements = this.softwareDatabase.get(softwareId);
    
    if (!requirements) {
      throw new Error('Software not found');
    }

    const checks: ComponentCheck[] = [];
    const recommendations: Recommendation[] = [];

    // Проверка GPU
    const gpuRating = this.getGPURating(systemProfile.gpu.normalizedName);
    const gpuStatus = gpuRating >= requirements.gpu.minPerformanceScore ? 'success' : 'fail';
    
    checks.push({
      component: 'GPU',
      status: gpuStatus,
      message: gpuStatus === 'success' 
        ? 'Видеокарта соответствует требованиям по производительности'
        : 'Производительности видеокарты недостаточно',
      userValue: systemProfile.gpu.normalizedName,
      requiredValue: requirements.gpu.model
    });

    if (gpuStatus === 'fail') {
      recommendations.push({
        type: 'critical',
        title: 'Обновите видеокарту',
        description: `Текущая видеокарта не соответствует минимальным требованиям. Рекомендуется видеокарта уровня ${requirements.gpu.model} или выше.`,
        action: 'Посмотреть варианты апгрейда'
      });
    }

    // Проверка CPU (по ядрам)
    const cpuStatus = systemProfile.cpu.cores >= requirements.cpu.minCores ? 'success' : 'fail';
    
    checks.push({
      component: 'CPU',
      status: cpuStatus,
      message: cpuStatus === 'success'
        ? `Количество ядер (${systemProfile.cpu.cores}) соответствует требованиям`
        : `Недостаточно ядер процессора (нужно минимум ${requirements.cpu.minCores})`,
      userValue: `${systemProfile.cpu.cores} ядер`,
      requiredValue: `${requirements.cpu.minCores} ядер`
    });

    // Проверка RAM
    const ramStatus = systemProfile.memory.totalGB >= requirements.ram.minGB ? 'success' : 'fail';
    
    checks.push({
      component: 'RAM',
      status: ramStatus,
      message: ramStatus === 'success'
        ? `Объем ОЗУ (${systemProfile.memory.totalGB} ГБ) достаточен`
        : `Недостаточно оперативной памяти (нужно минимум ${requirements.ram.minGB} ГБ)`,
      userValue: `${systemProfile.memory.totalGB} ГБ`,
      requiredValue: `${requirements.ram.minGB} ГБ`
    });

    if (ramStatus === 'fail') {
      recommendations.push({
        type: 'critical',
        title: 'Добавьте оперативной памяти',
        description: `Для комфортной работы требуется минимум ${requirements.ram.minGB} ГБ ОЗУ. У вас ${systemProfile.memory.totalGB} ГБ.`,
        action: 'Узнать о совместимых модулях памяти'
      });
    }

    // Проверка ОС
    const osStatus = systemProfile.system.os.includes(requirements.os.name) ? 'success' : 'warning';
    
    checks.push({
      component: 'OS',
      status: osStatus,
      message: osStatus === 'success'
        ? `Операционная система ${systemProfile.system.os} поддерживается`
        : `Требуется ${requirements.os.name}, а у вас ${systemProfile.system.os}`,
      userValue: systemProfile.system.os,
      requiredValue: requirements.os.name
    });

    // Определение общего статуса
    const hasFails = checks.some(c => c.status === 'fail');
    const hasWarnings = checks.some(c => c.status === 'warning');
    
    let overallStatus: 'compatible' | 'partial' | 'incompatible' = 'compatible';
    if (hasFails) {
      overallStatus = 'incompatible';
    } else if (hasWarnings) {
      overallStatus = 'partial';
    }

    // Добавляем оптимизационные рекомендации
    if (overallStatus === 'partial') {
      recommendations.push({
        type: 'optimization',
        title: 'Настройте графику для лучшей производительности',
        description: 'Ваша система соответствует минимальным требованиям. Рекомендуется снизить настройки графики до средних для комфортной работы.',
        action: 'Рекомендуемые настройки'
      });
    }

    return {
      softwareId: requirements.id,
      softwareName: requirements.name,
      overallStatus,
      checks,
      recommendations,
      timestamp: new Date().toISOString()
    };
  }

  getSoftwareList() {
    return Array.from(this.softwareDatabase.values()).map(({ id, name, category }) => ({
      id,
      name,
      category
    }));
  }
}

export default new CompatibilityService();
