export const getIsLogin = ({ session }) => session.token != null;

export const getLoginForm = ({ loginForm }) => loginForm;

export const getMLStatus = ({ mlStatus }) => mlStatus;

export const getMLImages = ({ mlImages }) => mlImages;

export const getPromptRequest = ({ prompt: state }) => ({
    user_info: {
        gender: state.userInfo.gender.value,
        age: String(state.userInfo.age),
        wage: String(state.userInfo.wage),
        cluster: state.userInfo.cluster.value,
    },
    banner: {
        type: state.banner.format.value,
        banner_type: state.banner.type.value,
        width: String(state.banner.width),
        height: String(state.banner.height),
    },
    prompt: state.prompt,
    product: state.product.value
})

export const getPromptTags = ({ prompt: state }) => [
    'пол_' + state.userInfo.gender.label.toLowerCase(),
    'возраст_' + String(state.userInfo.age),
    'зп_за_12_месяцев_' + String(state.userInfo.wage),
    'тип_пользователя_'+state.userInfo.cluster.label.toLowerCase().replace(/\s/gi, '_'),
    'баннер_'+state.banner.format.value,
    state.banner.type.value.toLocaleLowerCase(),
    String(state.banner.width) + 'x' + String(state.banner.height),
    'продукт_'+state.product.value.toLocaleLowerCase()
]