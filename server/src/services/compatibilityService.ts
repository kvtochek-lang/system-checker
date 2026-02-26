import { SystemProfile, CompatibilityResult, ComponentCheck, Recommendation, SoftwareRequirements } from '../types';

class CompatibilityService {
  private softwareDatabase: Map<string, SoftwareRequirements>;

  constructor() {
    this.softwareDatabase = new Map();
    this.initDatabase();
    console.log('CompatibilityService initialized with software:', this.getSoftwareList().length, 'programs');
  }

  private initDatabase() {
    // ==================== 50 ИГР ====================

    // 1. Cyberpunk 2077: Phantom Liberty
    this.softwareDatabase.set('cyberpunk-2077', {
      id: 'cyberpunk-2077',
      name: 'Cyberpunk 2077: Phantom Liberty',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce RTX 2060', minPerformanceScore: 9000, vram: 6 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 2. Baldur's Gate 3
    this.softwareDatabase.set('bg3', {
      id: 'bg3',
      name: "Baldur's Gate 3",
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 3. Starfield
    this.softwareDatabase.set('starfield', {
      id: 'starfield',
      name: 'Starfield',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1070', minPerformanceScore: 10000, vram: 8 },
      cpu: { minCores: 6, minPerformanceScore: 8000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 4. Red Dead Redemption 2
    this.softwareDatabase.set('rdr2', {
      id: 'rdr2',
      name: 'Red Dead Redemption 2',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 6000 },
      ram: { minGB: 12 },
      os: { name: 'Windows', version: '10' }
    });

    // 5. Hogwarts Legacy
    this.softwareDatabase.set('hogwarts-legacy', {
      id: 'hogwarts-legacy',
      name: 'Hogwarts Legacy',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6500, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 6. Elden Ring
    this.softwareDatabase.set('elden-ring', {
      id: 'elden-ring',
      name: 'Elden Ring',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 3 },
      cpu: { minCores: 4, minPerformanceScore: 6000 },
      ram: { minGB: 12 },
      os: { name: 'Windows', version: '10' }
    });

    // 7. Call of Duty: Modern Warfare III
    this.softwareDatabase.set('cod-mw3', {
      id: 'cod-mw3',
      name: 'Call of Duty: Modern Warfare III',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 5 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 8. Diablo IV
    this.softwareDatabase.set('diablo4', {
      id: 'diablo4',
      name: 'Diablo IV',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 9. The Witcher 3: Wild Hunt
    this.softwareDatabase.set('witcher3', {
      id: 'witcher3',
      name: 'The Witcher 3: Wild Hunt',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 660', minPerformanceScore: 4500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 6 },
      os: { name: 'Windows', version: '7' }
    });

    // 10. Assassin's Creed Valhalla
    this.softwareDatabase.set('ac-valhalla', {
      id: 'ac-valhalla',
      name: "Assassin's Creed Valhalla",
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6500, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 11. Marvel's Spider-Man Remastered
    this.softwareDatabase.set('spiderman', {
      id: 'spiderman',
      name: "Marvel's Spider-Man Remastered",
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 950', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 12. God of War
    this.softwareDatabase.set('god-of-war', {
      id: 'god-of-war',
      name: 'God of War',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 5500, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 13. Horizon Zero Dawn
    this.softwareDatabase.set('horizon', {
      id: 'horizon',
      name: 'Horizon Zero Dawn',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 780', minPerformanceScore: 6000, vram: 3 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 14. Death Stranding
    this.softwareDatabase.set('death-stranding', {
      id: 'death-stranding',
      name: 'Death Stranding',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 3 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 15. Days Gone
    this.softwareDatabase.set('days-gone', {
      id: 'days-gone',
      name: 'Days Gone',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 780', minPerformanceScore: 5500, vram: 3 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 16. Far Cry 6
    this.softwareDatabase.set('far-cry-6', {
      id: 'far-cry-6',
      name: 'Far Cry 6',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 17. Battlefield 2042
    this.softwareDatabase.set('battlefield-2042', {
      id: 'battlefield-2042',
      name: 'Battlefield 2042',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1050 Ti', minPerformanceScore: 5500, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 18. The Last of Us Part I
    this.softwareDatabase.set('last-of-us', {
      id: 'last-of-us',
      name: 'The Last of Us Part I',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 19. Uncharted: Legacy of Thieves
    this.softwareDatabase.set('uncharted', {
      id: 'uncharted',
      name: 'Uncharted: Legacy of Thieves',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 20. Ratchet & Clank: Rift Apart
    this.softwareDatabase.set('ratchet-clank', {
      id: 'ratchet-clank',
      name: 'Ratchet & Clank: Rift Apart',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 7500, vram: 6 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 21. Returnal
    this.softwareDatabase.set('returnal', {
      id: 'returnal',
      name: 'Returnal',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 7500, vram: 6 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 22. Forza Horizon 5
    this.softwareDatabase.set('forza-horizon-5', {
      id: 'forza-horizon-5',
      name: 'Forza Horizon 5',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 950', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 23. Microsoft Flight Simulator 2024
    this.softwareDatabase.set('msfs2024', {
      id: 'msfs2024',
      name: 'Microsoft Flight Simulator 2024',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 24. Counter-Strike 2
    this.softwareDatabase.set('cs2', {
      id: 'cs2',
      name: 'Counter-Strike 2',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 25. Valorant
    this.softwareDatabase.set('valorant', {
      id: 'valorant',
      name: 'Valorant',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 4000', minPerformanceScore: 1500, vram: 1 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 26. League of Legends
    this.softwareDatabase.set('lol', {
      id: 'lol',
      name: 'League of Legends',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 3000', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 27. Dota 2
    this.softwareDatabase.set('dota2', {
      id: 'dota2',
      name: 'Dota 2',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 4000', minPerformanceScore: 1500, vram: 1 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 28. Overwatch 2
    this.softwareDatabase.set('overwatch2', {
      id: 'overwatch2',
      name: 'Overwatch 2',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 660', minPerformanceScore: 4500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 6 },
      os: { name: 'Windows', version: '7' }
    });

    // 29. Apex Legends
    this.softwareDatabase.set('apex', {
      id: 'apex',
      name: 'Apex Legends',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 660', minPerformanceScore: 4500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 6 },
      os: { name: 'Windows', version: '7' }
    });

    // 30. Fortnite
    this.softwareDatabase.set('fortnite', {
      id: 'fortnite',
      name: 'Fortnite',
      category: 'game',
      gpu: { model: 'Intel HD 4000', minPerformanceScore: 2000, vram: 1 },
      cpu: { minCores: 2, minPerformanceScore: 2500 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 31. PUBG: Battlegrounds
    this.softwareDatabase.set('pubg', {
      id: 'pubg',
      name: 'PUBG: Battlegrounds',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 660', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '7' }
    });

    // 32. Minecraft
    this.softwareDatabase.set('minecraft', {
      id: 'minecraft',
      name: 'Minecraft',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 3000', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 33. Minecraft с шейдерами
    this.softwareDatabase.set('minecraft-shaders', {
      id: 'minecraft-shaders',
      name: 'Minecraft (с шейдерами)',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 34. Stray
    this.softwareDatabase.set('stray', {
      id: 'stray',
      name: 'Stray',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 650', minPerformanceScore: 4000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '7' }
    });

    // 35. Stardew Valley
    this.softwareDatabase.set('stardew', {
      id: 'stardew',
      name: 'Stardew Valley',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 2000', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 1000 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 36. Terraria
    this.softwareDatabase.set('terraria', {
      id: 'terraria',
      name: 'Terraria',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 2000', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 1000 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 37. Hades
    this.softwareDatabase.set('hades', {
      id: 'hades',
      name: 'Hades',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 630', minPerformanceScore: 1500, vram: 1 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 38. Hollow Knight
    this.softwareDatabase.set('hollow-knight', {
      id: 'hollow-knight',
      name: 'Hollow Knight',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 3000', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 2, minPerformanceScore: 1200 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 39. Celeste
    this.softwareDatabase.set('celeste', {
      id: 'celeste',
      name: 'Celeste',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 2000', minPerformanceScore: 400, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 800 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 40. Cuphead
    this.softwareDatabase.set('cuphead', {
      id: 'cuphead',
      name: 'Cuphead',
      category: 'game',
      gpu: { model: 'Intel HD Graphics 3000', minPerformanceScore: 600, vram: 0.5 },
      cpu: { minCores: 2, minPerformanceScore: 1000 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 41. Ori and the Will of the Wisps
    this.softwareDatabase.set('ori', {
      id: 'ori',
      name: 'Ori and the Will of the Wisps',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 650', minPerformanceScore: 3500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '7' }
    });

    // 42. Resident Evil 4 Remake
    this.softwareDatabase.set('re4', {
      id: 're4',
      name: 'Resident Evil 4 Remake',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 3 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 43. Dead Space Remake
    this.softwareDatabase.set('dead-space', {
      id: 'dead-space',
      name: 'Dead Space Remake',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 7500, vram: 6 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 44. Atomic Heart
    this.softwareDatabase.set('atomic-heart', {
      id: 'atomic-heart',
      name: 'Atomic Heart',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 45. Hi-Fi Rush
    this.softwareDatabase.set('hi-fi-rush', {
      id: 'hi-fi-rush',
      name: 'Hi-Fi Rush',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 46. Lies of P
    this.softwareDatabase.set('lies-of-p', {
      id: 'lies-of-p',
      name: 'Lies of P',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 47. Lords of the Fallen (2023)
    this.softwareDatabase.set('lords-fallen', {
      id: 'lords-fallen',
      name: 'Lords of the Fallen (2023)',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 6 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 48. Remnant II
    this.softwareDatabase.set('remnant2', {
      id: 'remnant2',
      name: 'Remnant II',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 970', minPerformanceScore: 7000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 49. Armored Core VI
    this.softwareDatabase.set('armored-core', {
      id: 'armored-core',
      name: 'Armored Core VI: Fires of Rubicon',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 12 },
      os: { name: 'Windows', version: '10' }
    });

    // 50. Street Fighter 6
    this.softwareDatabase.set('sf6', {
      id: 'sf6',
      name: 'Street Fighter 6',
      category: 'game',
      gpu: { model: 'NVIDIA GeForce GTX 950', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // ==================== 50 ПРОГРАММ ====================

    // 1. Adobe Photoshop 2025
    this.softwareDatabase.set('photoshop', {
      id: 'photoshop',
      name: 'Adobe Photoshop 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 2. Adobe Premiere Pro 2025
    this.softwareDatabase.set('premiere', {
      id: 'premiere',
      name: 'Adobe Premiere Pro 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 3. Adobe After Effects 2025
    this.softwareDatabase.set('after-effects', {
      id: 'after-effects',
      name: 'Adobe After Effects 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 4 },
      cpu: { minCores: 8, minPerformanceScore: 8000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 4. Adobe Illustrator 2025
    this.softwareDatabase.set('illustrator', {
      id: 'illustrator',
      name: 'Adobe Illustrator 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 5. Adobe InDesign 2025
    this.softwareDatabase.set('indesign', {
      id: 'indesign',
      name: 'Adobe InDesign 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 6. Adobe Lightroom 2025
    this.softwareDatabase.set('lightroom', {
      id: 'lightroom',
      name: 'Adobe Lightroom 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 12 },
      os: { name: 'Windows', version: '10' }
    });

    // 7. Adobe Audition 2025
    this.softwareDatabase.set('audition', {
      id: 'audition',
      name: 'Adobe Audition 2025',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 8. Blender 4.0
    this.softwareDatabase.set('blender', {
      id: 'blender',
      name: 'Blender 4.0',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 9. Autodesk Maya 2025
    this.softwareDatabase.set('maya', {
      id: 'maya',
      name: 'Autodesk Maya 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 7500, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 10. Autodesk 3ds Max 2025
    this.softwareDatabase.set('3dsmax', {
      id: '3dsmax',
      name: 'Autodesk 3ds Max 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 7500, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 11. AutoCAD 2025
    this.softwareDatabase.set('autocad', {
      id: 'autocad',
      name: 'AutoCAD 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 12. SolidWorks 2025
    this.softwareDatabase.set('solidworks', {
      id: 'solidworks',
      name: 'SolidWorks 2025',
      category: 'professional',
      gpu: { model: 'NVIDIA Quadro P1000', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 4, minPerformanceScore: 5000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 13. CATIA V6
    this.softwareDatabase.set('catia', {
      id: 'catia',
      name: 'CATIA V6',
      category: 'professional',
      gpu: { model: 'NVIDIA Quadro P2000', minPerformanceScore: 7000, vram: 5 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 14. Siemens NX
    this.softwareDatabase.set('siemens-nx', {
      id: 'siemens-nx',
      name: 'Siemens NX',
      category: 'professional',
      gpu: { model: 'NVIDIA Quadro P2000', minPerformanceScore: 7000, vram: 5 },
      cpu: { minCores: 6, minPerformanceScore: 6500 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 15. DaVinci Resolve 18
    this.softwareDatabase.set('davinci', {
      id: 'davinci',
      name: 'DaVinci Resolve 18',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 7000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 16. Final Cut Pro
    this.softwareDatabase.set('final-cut', {
      id: 'final-cut',
      name: 'Final Cut Pro',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 5000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4500 },
      ram: { minGB: 8 },
      os: { name: 'macOS', version: '11' }
    });

    // 17. Avid Media Composer
    this.softwareDatabase.set('avid', {
      id: 'avid',
      name: 'Avid Media Composer',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 18. Pro Tools
    this.softwareDatabase.set('pro-tools', {
      id: 'pro-tools',
      name: 'Pro Tools',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 19. FL Studio
    this.softwareDatabase.set('fl-studio', {
      id: 'fl-studio',
      name: 'FL Studio',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 20. Ableton Live 11
    this.softwareDatabase.set('ableton', {
      id: 'ableton',
      name: 'Ableton Live 11',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 21. Cubase Pro 12
    this.softwareDatabase.set('cubase', {
      id: 'cubase',
      name: 'Cubase Pro 12',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 22. Logic Pro X
    this.softwareDatabase.set('logic-pro', {
      id: 'logic-pro',
      name: 'Logic Pro X',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'macOS', version: '10.15' }
    });

    // 23. Visual Studio 2025
    this.softwareDatabase.set('visual-studio', {
      id: 'visual-studio',
      name: 'Visual Studio 2025',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 24. Visual Studio Code
    this.softwareDatabase.set('vscode', {
      id: 'vscode',
      name: 'Visual Studio Code',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 200, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1000 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 25. IntelliJ IDEA Ultimate
    this.softwareDatabase.set('intellij', {
      id: 'intellij',
      name: 'IntelliJ IDEA Ultimate',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 26. PyCharm Professional
    this.softwareDatabase.set('pycharm', {
      id: 'pycharm',
      name: 'PyCharm Professional',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 27. WebStorm
    this.softwareDatabase.set('webstorm', {
      id: 'webstorm',
      name: 'WebStorm',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 28. Eclipse IDE
    this.softwareDatabase.set('eclipse', {
      id: 'eclipse',
      name: 'Eclipse IDE',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 600, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 29. MATLAB R2024a
    this.softwareDatabase.set('matlab', {
      id: 'matlab',
      name: 'MATLAB R2024a',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1050', minPerformanceScore: 4000, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 4000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 30. Wolfram Mathematica
    this.softwareDatabase.set('mathematica', {
      id: 'mathematica',
      name: 'Wolfram Mathematica',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 1500, vram: 1 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 31. SPSS Statistics
    this.softwareDatabase.set('spss', {
      id: 'spss',
      name: 'SPSS Statistics',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 32. Tableau Desktop
    this.softwareDatabase.set('tableau', {
      id: 'tableau',
      name: 'Tableau Desktop',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 650', minPerformanceScore: 3500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 33. Power BI Desktop
    this.softwareDatabase.set('powerbi', {
      id: 'powerbi',
      name: 'Power BI Desktop',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 34. Qlik Sense
    this.softwareDatabase.set('qlik', {
      id: 'qlik',
      name: 'Qlik Sense',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 1000, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 35. Unity 2024
    this.softwareDatabase.set('unity', {
      id: 'unity',
      name: 'Unity 2024',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 960', minPerformanceScore: 6000, vram: 4 },
      cpu: { minCores: 6, minPerformanceScore: 6000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 36. Unreal Engine 5.3
    this.softwareDatabase.set('unreal', {
      id: 'unreal',
      name: 'Unreal Engine 5.3',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 1060', minPerformanceScore: 8000, vram: 6 },
      cpu: { minCores: 8, minPerformanceScore: 8000 },
      ram: { minGB: 16 },
      os: { name: 'Windows', version: '10' }
    });

    // 37. Godot Engine 4
    this.softwareDatabase.set('godot', {
      id: 'godot',
      name: 'Godot Engine 4',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 650', minPerformanceScore: 3500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 38. Docker Desktop
    this.softwareDatabase.set('docker', {
      id: 'docker',
      name: 'Docker Desktop',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '10' }
    });

    // 39. Kubernetes (minikube)
    this.softwareDatabase.set('kubernetes', {
      id: 'kubernetes',
      name: 'Kubernetes (minikube)',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 40. Vagrant
    this.softwareDatabase.set('vagrant', {
      id: 'vagrant',
      name: 'Vagrant',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 200, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 41. Ansible
    this.softwareDatabase.set('ansible', {
      id: 'ansible',
      name: 'Ansible',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 200, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 42. Terraform
    this.softwareDatabase.set('terraform', {
      id: 'terraform',
      name: 'Terraform',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 200, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 2 },
      os: { name: 'Windows', version: '7' }
    });

    // 43. MySQL Workbench
    this.softwareDatabase.set('mysql', {
      id: 'mysql',
      name: 'MySQL Workbench',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 44. pgAdmin 4
    this.softwareDatabase.set('pgadmin', {
      id: 'pgadmin',
      name: 'pgAdmin 4',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 45. MongoDB Compass
    this.softwareDatabase.set('mongodb', {
      id: 'mongodb',
      name: 'MongoDB Compass',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 500, vram: 0.25 },
      cpu: { minCores: 2, minPerformanceScore: 2000 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 46. Postman
    this.softwareDatabase.set('postman', {
      id: 'postman',
      name: 'Postman',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 300, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 47. Insomnia
    this.softwareDatabase.set('insomnia', {
      id: 'insomnia',
      name: 'Insomnia',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 300, vram: 0.1 },
      cpu: { minCores: 2, minPerformanceScore: 1500 },
      ram: { minGB: 4 },
      os: { name: 'Windows', version: '7' }
    });

    // 48. Figma
    this.softwareDatabase.set('figma', {
      id: 'figma',
      name: 'Figma',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });

    // 49. Sketch
    this.softwareDatabase.set('sketch', {
      id: 'sketch',
      name: 'Sketch',
      category: 'professional',
      gpu: { model: 'Intel HD Graphics', minPerformanceScore: 800, vram: 0.5 },
      cpu: { minCores: 4, minPerformanceScore: 3000 },
      ram: { minGB: 8 },
      os: { name: 'macOS', version: '11' }
    });

    // 50. Adobe XD
    this.softwareDatabase.set('adobe-xd', {
      id: 'adobe-xd',
      name: 'Adobe XD',
      category: 'professional',
      gpu: { model: 'NVIDIA GeForce GTX 750', minPerformanceScore: 3500, vram: 2 },
      cpu: { minCores: 4, minPerformanceScore: 3500 },
      ram: { minGB: 8 },
      os: { name: 'Windows', version: '10' }
    });
  }

  private getGPURating(model: string): number {
    const modelLower = model.toLowerCase();
    
    // NVIDIA RTX 40 series
    if (modelLower.includes('rtx 4090')) return 35000;
    if (modelLower.includes('rtx 4080')) return 28000;
    if (modelLower.includes('rtx 4070')) return 22000;
    if (modelLower.includes('rtx 4060')) return 16000;
    
    // NVIDIA RTX 30 series
    if (modelLower.includes('rtx 3090')) return 32000;
    if (modelLower.includes('rtx 3080')) return 26000;
    if (modelLower.includes('rtx 3070')) return 20000;
    if (modelLower.includes('rtx 3060')) return 12000;
    if (modelLower.includes('rtx 3050')) return 9000;
    
    // NVIDIA RTX 20 series
    if (modelLower.includes('rtx 2080')) return 15000;
    if (modelLower.includes('rtx 2070')) return 12000;
    if (modelLower.includes('rtx 2060')) return 9000;
    
    // NVIDIA GTX 16 series
    if (modelLower.includes('gtx 1660')) return 8000;
    if (modelLower.includes('gtx 1650')) return 5500;
    
    // NVIDIA GTX 10 series
    if (modelLower.includes('gtx 1080')) return 12000;
    if (modelLower.includes('gtx 1070')) return 10000;
    if (modelLower.includes('gtx 1060')) return 6500;
    if (modelLower.includes('gtx 1050')) return 4500;
    
    // AMD RX 7000 series
    if (modelLower.includes('rx 7900')) return 30000;
    if (modelLower.includes('rx 7800')) return 24000;
    if (modelLower.includes('rx 7700')) return 18000;
    
    // AMD RX 6000 series
    if (modelLower.includes('rx 6900')) return 26000;
    if (modelLower.includes('rx 6800')) return 21000;
    if (modelLower.includes('rx 6700')) return 15000;
    if (modelLower.includes('rx 6600')) return 11000;
    
    // AMD RX 500 series
    if (modelLower.includes('rx 580')) return 5500;
    if (modelLower.includes('rx 570')) return 4500;
    
    // Intel
    if (modelLower.includes('arc a770')) return 14000;
    if (modelLower.includes('arc a750')) return 12000;
    if (modelLower.includes('iris xe')) return 3000;
    if (modelLower.includes('uhd graphics')) return 1500;
    
    return 3000;
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

    // Проверка CPU
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
    let osStatus: 'success' | 'warning' | 'fail' = 'success';
    let osMessage = '';
    const osUserValue = systemProfile.system.os;
    const osRequiredValue = requirements.os.name;

    if (requirements.os.name === 'Windows' || requirements.os.name === 'Windows 10') {
      if (osUserValue.includes('Windows')) {
        if (osUserValue.includes('Windows 11')) {
          osStatus = 'success';
          osMessage = `Windows 11 совместима (требуется Windows 10 или выше)`;
        } else if (osUserValue.includes('Windows 10')) {
          osStatus = 'success';
          osMessage = `Windows 10 соответствует требованиям`;
        } else if (osUserValue === 'Windows') {
          osStatus = 'success';
          osMessage = `Windows совместима с требованиями`;
        } else {
          osStatus = 'warning';
          osMessage = `У вас ${osUserValue}, требуется Windows 10 или выше. Возможны проблемы.`;
        }
      } else {
        osStatus = 'fail';
        osMessage = `Требуется Windows, а у вас ${osUserValue}`;
      }
    } else {
      osStatus = osUserValue.includes(requirements.os.name) ? 'success' : 'fail';
      osMessage = osStatus === 'success'
        ? `ОС ${osUserValue} поддерживается`
        : `Требуется ${requirements.os.name}, а у вас ${osUserValue}`;
    }

    checks.push({
      component: 'OS',
      status: osStatus,
      message: osMessage,
      userValue: osUserValue,
      requiredValue: osRequiredValue
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

    if (overallStatus === 'partial') {
      recommendations.push({
        type: 'optimization',
        title: 'Настройте параметры для лучшей производительности',
        description: 'Ваша система соответствует минимальным требованиям. Рекомендуется снизить настройки для комфортной работы.',
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

const compatibilityService = new CompatibilityService();
export default compatibilityService;
