import * as ActionCategorios from "./categoriesAction";
import * as ActionArticles from "./articlesAction";
import * as ActionHastags from "./hastagAction";
import * as AcritonAdditionalPages from "./additionalPagesAction";

export default{
    ...ActionCategorios,
    ...ActionArticles,
    ...ActionHastags,
    ...AcritonAdditionalPages
};