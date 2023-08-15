(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{8336:function(e,t,a){Promise.resolve().then(a.t.bind(a,9077,23)),Promise.resolve().then(a.bind(a,2129)),Promise.resolve().then(a.bind(a,8550)),Promise.resolve().then(a.t.bind(a,448,23)),Promise.resolve().then(a.bind(a,1657)),Promise.resolve().then(a.bind(a,523)),Promise.resolve().then(a.t.bind(a,5430,23)),Promise.resolve().then(a.t.bind(a,3523,23))},2129:function(e,t,a){"use strict";a.r(t);var r=a(4953),s=a(3370);a(5722),t.default=()=>{let{theme:e,resolvedTheme:t}=(0,s.F)();return(0,r.jsx)("div",{className:"fixed top-0 -z-50 h-16 w-full bg-gradient-to-r from-orange-500/75 via-amber-500/75 to-red-500/75 blur-[100px]"})}},8550:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return A}});var r=a(4953),s=a(5722),n=a(8352),l=a(3626),o=a(3091),i=a(77),d=a(7877);let c=o.fC,u=o.xz,m=e=>{let{className:t,...a}=e;return(0,r.jsx)(o.h_,{className:(0,d.cn)(t),...a})};m.displayName=o.h_.displayName;let f=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(o.aV,{ref:t,className:(0,d.cn)("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s})});f.displayName=o.aV.displayName;let x=s.forwardRef((e,t)=>{let{className:a,children:s,...n}=e;return(0,r.jsxs)(m,{children:[(0,r.jsx)(f,{}),(0,r.jsxs)(o.VY,{ref:t,className:(0,d.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",a),...n,children:[s,(0,r.jsxs)(o.x8,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",children:[(0,r.jsx)(i.Pxu,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})});x.displayName=o.VY.displayName;let p=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:(0,d.cn)("flex flex-col space-y-1.5 text-center sm:text-left",t),...a})};p.displayName="DialogHeader";let g=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:(0,d.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...a})};g.displayName="DialogFooter";let h=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(o.Dx,{ref:t,className:(0,d.cn)("text-lg font-semibold leading-none tracking-tight",a),...s})});h.displayName=o.Dx.displayName;let v=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(o.dk,{ref:t,className:(0,d.cn)("text-sm text-muted-foreground",a),...s})});v.displayName=o.dk.displayName;var b=a(2447),j=a(9979),y=a(4927),N=a(599),w=a(6649),k=a(3868),D=a(5749),C=a(1985),z=a(1719),_=a(2558),F=a.n(_),I=a(2006),R=a.n(I),E=a(2787);let P=j.Ry({name:j.Z_().min(3,{message:"Your name must be at least 3 characters long"}).max(30,{message:"It's a name, not a poem (max 30 characters)"}),websites:j.IX(j.Ry({value:j.Z_().url({message:"Please enter a valid URL."})})).optional(),file:j.Z_().optional()});var A=e=>{var t;let{session:a}=e,o=(0,y.cI)({resolver:(0,N.F)(P),mode:"onChange"}),{fields:i,append:m}=(0,y.Dq)({name:"websites",control:o.control}),[f,j]=(0,s.useState)({text:"Create",disabled:!1,pulse:!1}),_=(0,E.useRouter)(),[I,A]=(0,s.useState)(null);async function S(e){try{if((null==e?void 0:e.sites).length>0||I){j({text:"Getting sources \uD83C\uDF0E",disabled:!0,pulse:!0}),console.log(e);let t=[];if((null==e?void 0:e.sites)&&(null==e?void 0:e.sites.length)>0){let a=await (0,k.T)(null==e?void 0:e.sites);console.log(a);let r=new D.s9({chunkSize:1e3,chunkOverlap:200}),s=await r.createDocuments([a]);t.push(...s)}if(I){let e=new D.s9({chunkSize:1e3,chunkOverlap:200}),a=new C.u(I),r=await a.loadAndSplit(e);t.push(...r)}return j({text:"Creating cog \uD83E\uDDE0",disabled:!0,pulse:!0}),t}j({text:"No sources provided \uD83D\uDE22",disabled:!1,pulse:!1})}catch(e){console.log("error",e),j({text:"Error getting sources \uD83D\uDE22",disabled:!1,pulse:!1})}}async function Y(e){var t,r;let s={sites:null===(t=e.websites)||void 0===t?void 0:t.map(e=>e.value),files:e.file},n=await S(s),l={name:e.name,docs:n,slug:F()(e.name,{lower:!0}),userId:null==a?void 0:null===(r=a.user)||void 0===r?void 0:r.id,tags:[],isPrivate:!0,description:"Cog about ".concat(e.name),imgUrl:"https://em-content.zobj.net/thumbs/240/apple/354/fire_1f525.png"};await z.Z.post("/api/cog/create",{data:l}).then(e=>{j({text:"Cog created! \uD83C\uDF89",disabled:!0,pulse:!1}),console.log(e),console.log("/cog/".concat(null==a?void 0:a.user.username,"/").concat(e.data.cog.slug)),_.push("/cog/".concat(null==a?void 0:a.user.username,"/").concat(e.data.cog.slug))}).catch(e=>{j({text:"Error creating cog \uD83D\uDE22",disabled:!1,pulse:!1}),console.log(e)})}let G=async e=>{if(e.target.files)try{var t;let a=null===(t=e.target.files)||void 0===t?void 0:t[0];if(a){let e=await a.arrayBuffer(),t=new Blob([new Uint8Array(e)],{type:a.type});A(t)}}catch(e){console.log("err",e)}};return(0,r.jsxs)(c,{children:[(0,r.jsx)(u,{asChild:!0,children:(0,r.jsxs)(n.z,{variant:"outline",className:"space-x-2",children:[(0,r.jsx)("span",{children:"Quick Create"}),(0,r.jsx)(l.lbY,{className:"h-4 w-4"})]})}),(0,r.jsxs)(x,{className:"sm:max-w-[425px]",children:[(0,r.jsxs)(p,{children:[(0,r.jsx)(h,{children:"Quick Create"}),(0,r.jsx)(v,{children:"Quickly create a private cog ⚡️"})]}),(0,r.jsx)("div",{className:"grid gap-4 py-4",children:(0,r.jsx)(w.l0,{...o,children:(0,r.jsxs)("form",{className:"space-y-4",onSubmit:o.handleSubmit(Y),children:[(0,r.jsx)(w.Wi,{control:o.control,name:"name",render:e=>{let{field:t}=e;return(0,r.jsxs)(w.xJ,{children:[(0,r.jsx)(w.lX,{children:"Name"}),(0,r.jsx)(w.NI,{children:(0,r.jsx)(b.I,{placeholder:"Name",...t})}),(0,r.jsx)(w.pf,{children:"Give it a quick name so you can find it later"}),(0,r.jsx)(w.zG,{})]})}}),(0,r.jsxs)("div",{children:[i.map((e,t)=>(0,r.jsx)(w.Wi,{control:o.control,name:"websites.".concat(t,".value"),render:e=>{let{field:a}=e;return(0,r.jsxs)(w.xJ,{children:[(0,r.jsx)(w.lX,{className:(0,d.cn)(0!==t&&"sr-only"),children:"Websites"}),(0,r.jsx)(w.pf,{className:(0,d.cn)(0!==t&&"sr-only"),children:"Websites you want to train the cog on."}),(0,r.jsx)(w.NI,{children:(0,r.jsx)(b.I,{...a})}),(0,r.jsx)(w.zG,{})]})}},e.id)),(0,r.jsx)(n.z,{type:"button",variant:"outline",size:"sm",className:"mt-2",onClick:()=>m({value:""}),children:"Add Website"})]}),(0,r.jsx)(w.Wi,{control:o.control,name:"file",render:e=>{let{field:t}=e;return(0,r.jsxs)(w.xJ,{children:[(0,r.jsx)(w.lX,{children:"Files"}),(0,r.jsx)(w.NI,{children:(0,r.jsx)(b.I,{type:"file",placeholder:"File",...t,onChange:G})}),(0,r.jsx)(w.pf,{children:"You can also upload a PDF"}),(0,r.jsx)(w.zG,{})]})}}),(0,r.jsx)(g,{children:(null==a?void 0:null===(t=a.user)||void 0===t?void 0:t.id)?(0,r.jsx)(n.z,{type:"submit",className:(0,d.cn)(f.disabled&&"cursor-not-allowed"),children:(0,r.jsx)("span",{className:(0,d.cn)(f.pulse&&"animate-pulse"),children:f.text})}):(0,r.jsx)("div",{children:(0,r.jsx)(R(),{href:"/api/auth/signin",children:(0,r.jsx)(n.z,{type:"button",children:"Sign in to create a cog"})})})})]})})})]})]})}},523:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return g}});var r=a(4953),s=a(5722),n=a(5800),l=a(7877);let o=n.fC,i=n.xz,d=s.forwardRef((e,t)=>{let{className:a,align:s="center",sideOffset:o=4,...i}=e;return(0,r.jsx)(n.VY,{ref:t,align:s,sideOffset:o,className:(0,l.cn)("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...i})});d.displayName=n.VY.displayName;var c=a(1657),u=e=>{let t=new Date(e),a=function(e){let t=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()],a=e.getDate(),r=e.getFullYear();return"".concat(t," ").concat(a,", ").concat(r)}(t);return a},m=a(2006),f=a.n(m),x=a(9814),p=a(5736),g=e=>{var t,a;let{user:s,nameClass:n}=e,l=u(null==s?void 0:s.createdDate);return(0,r.jsxs)(o,{children:[(0,r.jsx)(i,{className:n,asChild:!0,children:(0,r.jsxs)(f(),{href:"/user/".concat(null==s?void 0:s.username),children:["@",null==s?void 0:s.username]})}),(0,r.jsx)(d,{className:"w-80 bg-background/75 backdrop-blur-md",children:(0,r.jsxs)("div",{className:"flex space-x-4",children:[(0,r.jsxs)(c.Avatar,{children:[(0,r.jsx)(c.AvatarImage,{src:null==s?void 0:s.image}),(0,r.jsx)(c.AvatarFallback,{children:null==s?void 0:null===(t=s.username)||void 0===t?void 0:t.charAt(0).toUpperCase()})]}),(0,r.jsxs)("div",{className:"space-y-1 self-start",children:[(0,r.jsxs)("h4",{className:"text-sm font-semibold",children:["@",null==s?void 0:s.username]}),(0,r.jsx)("p",{className:"text-sm",children:null!==(a=(0,r.jsx)(x.D,{children:null==s?void 0:s.bio}))&&void 0!==a?a:"Cognition bio"}),(0,r.jsxs)("div",{className:"flex items-center pt-2",children:[(0,r.jsx)(p.Z,{className:"mr-2 h-4 w-4 opacity-70"})," ",(0,r.jsxs)("span",{className:"text-xs text-muted-foreground",children:["Joined ",l]})]})]})]})})]})}},1657:function(e,t,a){"use strict";a.r(t),a.d(t,{Avatar:function(){return o},AvatarFallback:function(){return d},AvatarImage:function(){return i}});var r=a(4953),s=a(5722),n=a(6070),l=a(7877);let o=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(n.fC,{ref:t,className:(0,l.cn)("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...s})});o.displayName=n.fC.displayName;let i=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(n.Ee,{ref:t,className:(0,l.cn)("aspect-square h-full w-full",a),...s})});i.displayName=n.Ee.displayName;let d=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(n.NY,{ref:t,className:(0,l.cn)("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...s})});d.displayName=n.NY.displayName},8352:function(e,t,a){"use strict";a.d(t,{d:function(){return i},z:function(){return d}});var r=a(4953),s=a(5722),n=a(2573),l=a(8786),o=a(7877);let i=(0,l.j)("inline-flex items-center justify-center rounded-md text-sm font-medium transition active:scale-[0.98] duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-9 rounded-md px-3 text-sm",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=s.forwardRef((e,t)=>{let{className:a,variant:s,size:l,asChild:d=!1,...c}=e,u=d?n.g7:"button";return(0,r.jsx)(u,{className:(0,o.cn)(i({variant:s,size:l,className:a})),ref:t,...c})});d.displayName="Button"},6649:function(e,t,a){"use strict";a.d(t,{l0:function(){return m},NI:function(){return b},pf:function(){return j},Wi:function(){return x},xJ:function(){return h},lX:function(){return v},zG:function(){return y}});var r=a(4953),s=a(5722),n=a(2573),l=a(4927),o=a(7877),i=a(129),d=a(8786);let c=(0,d.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),u=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(i.f,{ref:t,className:(0,o.cn)(c(),a),...s})});u.displayName=i.f.displayName;let m=l.RV,f=s.createContext({}),x=e=>{let{...t}=e;return(0,r.jsx)(f.Provider,{value:{name:t.name},children:(0,r.jsx)(l.Qr,{...t})})},p=()=>{let e=s.useContext(f),t=s.useContext(g),{getFieldState:a,formState:r}=(0,l.Gc)(),n=a(e.name,r);if(!e)throw Error("useFormField should be used within <FormField>");let{id:o}=t;return{id:o,name:e.name,formItemId:"".concat(o,"-form-item"),formDescriptionId:"".concat(o,"-form-item-description"),formMessageId:"".concat(o,"-form-item-message"),...n}},g=s.createContext({}),h=s.forwardRef((e,t)=>{let{className:a,...n}=e,l=s.useId();return(0,r.jsx)(g.Provider,{value:{id:l},children:(0,r.jsx)("div",{ref:t,className:(0,o.cn)("space-y-2",a),...n})})});h.displayName="FormItem";let v=s.forwardRef((e,t)=>{let{className:a,...s}=e,{error:n,formItemId:l}=p();return(0,r.jsx)(u,{ref:t,className:(0,o.cn)(n&&"text-destructive",a),htmlFor:l,...s})});v.displayName="FormLabel";let b=s.forwardRef((e,t)=>{let{...a}=e,{error:s,formItemId:l,formDescriptionId:o,formMessageId:i}=p();return(0,r.jsx)(n.g7,{ref:t,id:l,"aria-describedby":s?"".concat(o," ").concat(i):"".concat(o),"aria-invalid":!!s,...a})});b.displayName="FormControl";let j=s.forwardRef((e,t)=>{let{className:a,...s}=e,{formDescriptionId:n}=p();return(0,r.jsx)("p",{ref:t,id:n,className:(0,o.cn)("text-sm text-muted-foreground",a),...s})});j.displayName="FormDescription";let y=s.forwardRef((e,t)=>{let{className:a,children:s,...n}=e,{error:l,formMessageId:i}=p(),d=l?String(null==l?void 0:l.message):s;return d?(0,r.jsx)("p",{ref:t,id:i,className:(0,o.cn)("text-sm font-medium text-destructive",a),...n,children:d}):null});y.displayName="FormMessage"},2447:function(e,t,a){"use strict";a.d(t,{I:function(){return l}});var r=a(4953),s=a(5722),n=a(7877);let l=s.forwardRef((e,t)=>{let{className:a,type:s,...l}=e;return(0,r.jsx)("input",{type:s,className:(0,n.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",a),ref:t,...l})});l.displayName="Input"},7877:function(e,t,a){"use strict";a.d(t,{cn:function(){return n}});var r=a(3501),s=a(2701);function n(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,s.m)((0,r.W)(t))}},3868:function(e,t,a){"use strict";a.d(t,{T:function(){return s}});var r=a(1719);let s=async e=>{try{let t=await r.Z.post("/api/extract",{urls:e});return console.log("response",t),t.data.extracted_text}catch(e){e instanceof Error?console.log(e.message):console.log("Unexpected error",e)}}},3523:function(e){e.exports={style:{fontFamily:"'__Space_Grotesk_e75d16', '__Space_Grotesk_Fallback_e75d16'",fontStyle:"normal"},className:"__className_e75d16"}}},function(e){e.O(0,[559,545,507,301,77,594,500,726,947,251,193,406,549,506,744],function(){return e(e.s=8336)}),_N_E=e.O()}]);