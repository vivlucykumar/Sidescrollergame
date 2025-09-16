export class InputManager {
  private keys: Map<string, boolean>;

  constructor() {
    this.keys = new Map();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    window.addEventListener('keydown', (event) => {
      this.keys.set(event.code, true);
      console.log(`Key pressed: ${event.code}`);
    });

    window.addEventListener('keyup', (event) => {
      this.keys.set(event.code, false);
      console.log(`Key released: ${event.code}`);
    });

    // Prevent context menu on touch devices
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  }

  public isKeyPressed(key: string): boolean {
    return this.keys.get(key) || false;
  }

  public setKey(key: string, pressed: boolean) {
    this.keys.set(key, pressed);
    console.log(`Touch control: ${key} ${pressed ? 'pressed' : 'released'}`);
  }
}