declare global {
  namespace NodeJS {
    interface Global {
      mongoose: typeof import("mongoose");
    }
  }
}
