type RequiredInputType = {
  type: string;
};

type OptionInputType = {
  placeholder: string;
};

export type InputType = RequiredInputType & Partial<OptionInputType>;
