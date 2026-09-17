import type { IPublicSkillCard } from "../../utils/types";
import type {
  TGenderOption,
  TSkillOption,
} from "../../widgets/filter-bar/radio-groups/types";
import { GENDER_FILTER_MAP } from "./genderFilterMap";

export const matchesCityFeed = (
  item: IPublicSkillCard,
  cities: string[],
): boolean =>
  cities.length === 0 ||
  (!!item.user.city && cities.includes(item.user.city.name));

export const matchesGenderFeed = (
  item: IPublicSkillCard,
  gender: TGenderOption,
): boolean => {
  if (gender === "all") return true;
  return item.user.gender === GENDER_FILTER_MAP[gender];
};

export const matchesSkillFeed = (
  item: IPublicSkillCard,
  subCategoryIds: string[],
  skillOption: TSkillOption,
): boolean => {
  if (subCategoryIds.length === 0) return true;

  const wantsToLearn = (item.user.wantToLearn ?? []).some((w) =>
    subCategoryIds.includes(w.id),
  );

  // TODO: у навыка пока нет собственной категории в ответе GET /skills,
  // поэтому "чему может научить" временно не фильтруется по категории.
  if (skillOption === "can-teach") return true;
  if (skillOption === "want-to-learn") return wantsToLearn;

  return wantsToLearn; // 'all'
};