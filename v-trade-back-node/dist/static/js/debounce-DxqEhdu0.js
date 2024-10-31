function r(e,n){let t=null;return function(){const i=this,o=arguments;t&&clearTimeout(t),t=setTimeout(()=>{e.apply(i,o)},n)}}export{r as d};
