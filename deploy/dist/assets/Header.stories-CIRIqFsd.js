import{f as a}from"./index-BASH1HpE.js";import{_ as o}from"./Header-B7eLxK6E.js";import"./vue.esm-bundler-BdP0x0pZ.js";const i={title:"Example/Header",component:o,render:g=>({components:{MyHeader:o},setup(){return{args:g}},template:'<my-header :user="args.user" />'}),parameters:{layout:"fullscreen"},args:{onLogin:a(),onLogout:a(),onCreateAccount:a()},tags:["autodocs"]},e={args:{user:{name:"Jane Doe"}}},r={args:{user:null}};var s,n,t;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    user: {
      name: 'Jane Doe'
    }
  }
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var m,u,c;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    user: null
  }
}`,...(c=(u=r.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const f=["LoggedIn","LoggedOut"];export{e as LoggedIn,r as LoggedOut,f as __namedExportsOrder,i as default};
