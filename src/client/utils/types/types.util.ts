export type PartialRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

export type ArrayElement<ArrType> =
  ArrType extends readonly (infer ElementType)[] ? ElementType : never;

export type InputChangePayload = {
  field: string;
  value: string;
};
