declare module 'aos' {
    interface AosOptions {
      duration?: number;
      delay?: number;
      easing?: string;
      once?: boolean;
      mirror?: boolean;
      anchorPlacement?: string;
    }
  
    const AOS: {
      init(options?: AosOptions): void;
      refresh(): void;
      refreshHard(): void;
    };
  
    export default AOS;
  }
  