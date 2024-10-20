export interface Radiuses {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export interface RadiusFormData {
  isValid: boolean;
  values: Radiuses;
}
