import { useState, type FC } from "react";
import { SkillRegister } from "../../shared/ui/register";
import type { OptionType } from "../../shared/ui/dropdown/types";

export const SkillCreate: FC = () => {
  const [skillName, setSkillName] = useState("");
  const [skillSubcategory, setSkillSubcategory] = useState<OptionType | null>(
    null,
  );
  const [skillDescription, setSkillDescription] = useState("");
  const [skillImages, setSkillImages] = useState<string[]>([]);

  return (
    <SkillRegister
        skillName={skillName}
        setSkillName={setSkillName}
        skillSubcategory={skillSubcategory}
        setSkillSubcategory={setSkillSubcategory}
        skillDescription={skillDescription}
        setSkillDescription={setSkillDescription}
        skillImages={skillImages}
        setSkillImages={setSkillImages}
        onBack={() => {}}
        onSubmit={() => {}}
        errorText="error"
    />
  )
};
