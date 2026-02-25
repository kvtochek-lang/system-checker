import { Request, Response } from 'express';
import compatibilityService from '../services/compatibilityService';

export const checkCompatibility = async (req: Request, res: Response) => {
  try {
    const { systemProfile, softwareId } = req.body;

    if (!systemProfile || !softwareId) {
      return res.status(400).json({ 
        error: 'Missing required fields: systemProfile and softwareId' 
      });
    }

    const result = await compatibilityService.checkCompatibility(systemProfile, softwareId);
    res.json(result);
  } catch (error) {
    console.error('Error checking compatibility:', error);
    res.status(500).json({ 
      error: 'Failed to check compatibility',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getSoftwareList = (req: Request, res: Response) => {
  try {
    const softwareList = compatibilityService.getSoftwareList();
    res.json(softwareList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get software list' });
  }
};
