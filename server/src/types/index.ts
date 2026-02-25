export interface GPUInfo {
  name: string;
  vendor: string;
  normalizedName: string;
}

export interface CPUInfo {
  cores: number;
  architecture: string;
}

export interface MemoryInfo {
  totalGB: number;
  available?: number;
}

export interface SystemInfo {
  os: string;
  browser: string;
  language: string;
  platform: string;
}

export interface SystemProfile {
  gpu: GPUInfo;
  cpu: CPUInfo;
  memory: MemoryInfo;
  system: SystemInfo;
  timestamp: string;
  userAgent: string;
}

export interface ComponentCheck {
  component: string;
  status: 'success' | 'warning' | 'fail';
  message: string;
  userValue: string;
  requiredValue: string;
  difference?: number;
}

export interface Recommendation {
  type: 'critical' | 'optimization' | 'info';
  title: string;
  description: string;
  action?: string;
}

export interface CompatibilityResult {
  softwareId: string;
  softwareName: string;
  overallStatus: 'compatible' | 'partial' | 'incompatible';
  checks: ComponentCheck[];
  recommendations: Recommendation[];
  timestamp: string;
}

export interface SoftwareRequirements {
  id: string;
  name: string;
  category: string;
  gpu: {
    model: string;
    minPerformanceScore: number;
    vram: number;
  };
  cpu: {
    minCores: number;
    minPerformanceScore: number;
  };
  ram: {
    minGB: number;
  };
  os: {
    name: string;
    version?: string;
  };
}
