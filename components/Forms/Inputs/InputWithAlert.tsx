import React from "react";
import styles from "./InputWithAlert.module.scss";
import className from "classnames/bind";

const cx = className.bind(styles);

type Props = {
  label: string;
  alert?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputWithAlert = (
  { label, alert, value, size, disabled, ...args }: Props,
  ref: React.Ref<HTMLInputElement>
) => {
  const inputId = React.useId();

  return (
    <div className={cx({ wrapper: true })}>
      <label className={cx({ label: true })} htmlFor={inputId}>
        {label}
      </label>
      <div className={cx({ input_wrapper: true })}>
        <input
          id={inputId}
          className={cx({ input: true })}
          {...args}
          ref={ref}
        />
        <div className={cx({ alert: true })}>{alert}</div>
      </div>
    </div>
  );
};

export default React.forwardRef(InputWithAlert);
