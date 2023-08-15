"use strict";
exports.id = 4154;
exports.ids = [4154];
exports.modules = {

/***/ 24154:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ authOptions),
/* harmony export */   P: () => (/* binding */ getAuthSession)
/* harmony export */ });
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93017);
/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56462);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9026);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10978);
/* harmony import */ var next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(87651);
/* harmony import */ var next_auth_providers_github__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(31807);
/* harmony import */ var friendly_username_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67817);







const authOptions = {
    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__/* .PrismaAdapter */ .N)(_lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z),
    providers: [
        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)({
            clientId: "237284825711-ch2ks2d3c1pef25baufm3vb47s89otp7.apps.googleusercontent.com",
            clientSecret: "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",
            allowDangerousEmailAccountLinking: true
        }),
        (0,next_auth_providers_github__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)({
            clientId: process.env.MY_GITHUB_CLIENT_ID,
            clientSecret: process.env.MY_GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        (0,next_auth_providers_discord__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        })
    ],
    pages: {
        signIn: "/auth/signin"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session ({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.username = token.username;
                session.user.bio = token.bio;
                session.user.createdDate = token.createdDate;
            }
            return session;
        },
        async jwt ({ token, user }) {
            const dbUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.user.findFirst({
                where: {
                    email: token.email
                }
            });
            if (!dbUser) {
                token.id = user.id;
                return token;
            }
            if (!dbUser.username) {
                await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        username: (0,friendly_username_generator__WEBPACK_IMPORTED_MODULE_6__/* .generateUsername */ .K)()
                    }
                });
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
                bio: dbUser.bio,
                createdDate: dbUser.createdDate
            };
        }
    }
};
async function updateUser(user, account) {
    //
    // handle username so it is less than 15 chars for zod validation
    let username = user.username.substring(0, 6);
    switch(account.provider){
        case "google":
            username = `go_${username}`;
            break;
        case "facebook":
            username = `fb_${username}`;
            break;
    }
    const data = {
        provider: account.provider,
        username
    };
    if (!user.email) {
        data.email = `${data.username}@non-existing-facebook-email.com`;
    }
    await prisma.user.update({
        where: {
            id: user.id
        },
        data
    });
    return data;
}
const getAuthSession = ()=>(0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(authOptions);


/***/ }),

/***/ 93017:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53524);
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);

let prisma;
if (true) {
    prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();
} else {}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);


/***/ })

};
;