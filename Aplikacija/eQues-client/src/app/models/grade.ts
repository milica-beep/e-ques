export class Grade {
  constructor(value: number, userId: number) {
    this.value = value;
    this.userId = userId;
  }
  value: number;
  userId: number;
  timestampStr: string;
}
