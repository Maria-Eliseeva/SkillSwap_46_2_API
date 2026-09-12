import type { TId } from "../../utils/types";

// Color is based only on the stable parent category id, so renamed or newly
// added database categories require no corresponding frontend change.
const CATEGORY_COLORS = [
  "var(--color-category-business)",
  "var(--color-category-creative)",
  "var(--color-category-languages)",
  "var(--color-category-education)",
  "var(--color-category-home)",
  "var(--color-category-health)",
  "var(--color-category-it)",
] as const;

const DEFAULT_LEARN_COLOR = CATEGORY_COLORS[0];

type WithId = {
  id?: TId;
};

type WithSkillCategoryId = WithId & {
  skillCategoryId?: TId;
};

type WithSkillSubcategory = WithId & {
  skillSubcategory?: TId | null;
};

export const getCategoryColorById = (categoryId: TId): string => {
  let hash = 0;

  for (let index = 0; index < categoryId.length; index += 1) {
    hash = (hash * 31 + categoryId.charCodeAt(index)) >>> 0;
  }

  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length] ?? DEFAULT_LEARN_COLOR;
};
export const getCategoryColorBySubcategoryId = <
  TSubCategory extends WithSkillCategoryId,
  TCategory extends WithId,
>(
  subcategoryId: TId | undefined,
  subCategories: ReadonlyArray<TSubCategory>,
  categories: ReadonlyArray<TCategory>,
): string | undefined => {
  if (!subcategoryId) {
    return undefined;
  }

  const subCategory = subCategories.find((item) => item.id === subcategoryId);

  if (!subCategory?.skillCategoryId) {
    return undefined;
  }

  const category = categories.find(
    (item) => item.id === subCategory.skillCategoryId,
  );

  if (!category?.id) {
    return undefined;
  }

  return getCategoryColorById(category.id);
};

export const getTeachColor = <
  TSkill extends WithSkillSubcategory,
  TSubCategory extends WithSkillCategoryId,
  TCategory extends WithId,
>(
  skillId: TId | undefined,
  skills: ReadonlyArray<TSkill>,
  subCategories: ReadonlyArray<TSubCategory>,
  categories: ReadonlyArray<TCategory>,
): string | undefined => {
  if (!skillId) {
    return undefined;
  }

  const skill = skills.find((item) => item.id === skillId);

  if (!skill?.skillSubcategory) {
    return undefined;
  }

  return getCategoryColorBySubcategoryId(
    skill.skillSubcategory,
    subCategories,
    categories,
  );
};

export const getLearnColors = <
  TSubCategory extends WithSkillCategoryId,
  TCategory extends WithId,
>(
  subcategoryIds: TId[],
  subCategories: ReadonlyArray<TSubCategory>,
  categories: ReadonlyArray<TCategory>,
): string[] =>
  subcategoryIds.map((subcategoryId) => {
    return (
      getCategoryColorBySubcategoryId(
        subcategoryId,
        subCategories,
        categories,
      ) ?? DEFAULT_LEARN_COLOR
    );
  });
