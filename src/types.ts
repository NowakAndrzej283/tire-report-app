export interface WheelData {
    tireBrand: string;
    size: string;
    treadDepth: number;
    dot: string;
    rating: number;
    notes?: string;
  }
  
  export interface ReportFormData {
    brand: string;
    model: string;
    vin: string;
    email?: string;
    wheels: {
      frontLeft: WheelData;
      frontRight: WheelData;
      rearLeft: WheelData;
      rearRight: WheelData;
    };
  }