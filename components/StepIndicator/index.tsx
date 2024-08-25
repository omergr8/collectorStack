import React from "react";
import styles from "./StepIndicator.module.css";
import { StepIndicatorProps } from "@/constants/types";

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  details,
}) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.stepIndicator}>
      {steps.map((step, i) => (
        <div key={step} className="position-relative">
          <div className={styles.stepBox}>
            <div
              className={`${styles.stepIcon} ${
                currentStep >= step && styles.activeStepIcon
              }`}
            >
              {currentStep >= step && <div className={styles.activeStep} />}
            </div>
            {details && (
              <div className={styles.stepText}>
                <p
                  className={`${styles.text} ${
                    currentStep >= step && styles.activeText
                  }`}
                >
                  {details[i]}
                </p>
              </div>
            )}
          </div>
          {steps.length > i + 1 && <div className={styles.connectingLine} />}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
