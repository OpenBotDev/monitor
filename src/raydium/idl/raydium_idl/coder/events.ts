import { Idl, Event, EventCoder } from "@coral-xyz/anchor";
import { IdlEvent } from "@coral-xyz/anchor/dist/cjs/idl";

export class RaydiumAmmEventsCoder implements EventCoder {
  constructor(_idl: Idl) { }


  decode<E extends IdlEvent = IdlEvent, T = Record<string, string>>(
    _log: string
  ): Event<E, T> | null {
    throw new Error("RaydiumAmm program does not have events");
  }
}