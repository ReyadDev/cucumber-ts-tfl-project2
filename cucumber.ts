import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import axios, { AxiosInstance } from "axios";

export class CustomWorld extends World {
  public tflApi: AxiosInstance;

  constructor(options: IWorldOptions) {
    super(options);
    this.tflApi = axios.create({
      baseURL: "https://api.tfl.gov.uk/",
      timeout: 10000,
    });
  }
}

setWorldConstructor(CustomWorld);
