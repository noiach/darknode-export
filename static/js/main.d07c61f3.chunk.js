(this["webpackJsonpdarknode-tax"]=this["webpackJsonpdarknode-tax"]||[]).push([[0],{117:function(e,t){},130:function(e,t,n){"use strict";n.r(t);n(90);var a=n(13),r=n.n(a),s=n(84),i=n.n(s),o=n(1),u=n.n(o),p=n(26),l=n(48),d=n(139),c=n(32),y=n(31),m=n(85),b=n.n(m),f=n(46),h="0x2D7b6C95aFeFFa50C068D50f89C5C0014e054f0A",v="https://mainnet.infura.io/v3/".concat("fa7d507418f54bbfb78a054eabb01f48"),x=n(59),k=n.n(x),g=function(){var e=Object(p.a)(u.a.mark((function e(){var t,n,a,r,s,i,o,p,l,d,c,m;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://lightnode-mainnet.herokuapp.com",{id:1,jsonrpc:"2.0",method:"ren_queryBlockState",params:{}});case 2:t=e.sent,n=t.data,a={},r=0,s=Object.keys(n.result.state.v);case 6:if(!(r<s.length)){e.next=16;break}if(o=s[r],p=null===(i=n.result.state.v[o].fees)||void 0===i?void 0:i.epochs){e.next=11;break}return e.abrupt("continue",13);case 11:l=Object(y.a)(p);try{for(l.s();!(d=l.n()).done;)c=d.value,m=parseInt(c.epoch,10)+14,a[m]=a[m]||{},a[m][o]=Math.floor(c.amount/c.numNodes)}catch(u){l.e(u)}finally{l.f()}case 13:r++,e.next=6;break;case 16:return delete a[14],delete a[15],e.abrupt("return",a);case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(p.a)(u.a.mark((function e(t){var n,a,r,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://api.thegraph.com/subgraphs/name/renproject/renvm",{query:"\n{\n    epoches(first: 100, orderBy: blockNumber, orderDirection:asc) {\n        blockNumber\n        \n        rewardShares {\n        symbol\n        amount\n        amountInUsd\n        }\n    }\n}\n"});case 2:n=e.sent,a={},r=Object(y.a)(n.data.data.epoches);try{for(i=function(){var e,n=s.value,r=t.filter((function(e){return e.startBlockNumber.toString()===n.blockNumber}))[0].index-1,i=Object(y.a)(n.rewardShares);try{for(i.s();!(e=i.n()).done;){var o=e.value;"ETH"!==o.symbol&&"SAI"!==o.symbol&&(a[r]=a[r]||{},a[r][o.symbol]=o.amount)}}catch(u){i.e(u)}finally{i.f()}},r.s();!(s=r.n()).done;)i()}catch(o){r.e(o)}finally{r.f()}return e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(p.a)(u.a.mark((function e(){var t,n,a,r,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("https://api.thegraph.com/subgraphs/name/renproject/renvm",{query:"\n{\n    assets {\n        symbol\n        decimals\n    }\n}\n  "});case 2:t=e.sent,n={},a=Object(y.a)(t.data.data.assets);try{for(a.s();!(r=a.n()).done;)s=r.value,n[s.symbol.replace(/^ren/,"")]=s.decimals}catch(i){a.e(i)}finally{a.f()}return e.abrupt("return",n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=n(47),O=function(){var e=Object(p.a)(u.a.mark((function e(t,n){var a,r,s,i,o,l,d,m,v,x,k,O,M,D,_,I,N,S,E,P,B,R,C,L,z,A,F;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(j.a)(t,h,f,"LogNewEpoch",[]);case 2:a=e.sent,r=-15,s=[],i=Object(y.a)(a);try{for(i.s();!(o=i.n()).done;)l=o.value,s.push({index:r,startBlockNumber:l.blockNumber,timestamp:0}),r+=1}catch(U){i.e(U)}finally{i.f()}return e.next=9,Promise.all(s.map(function(){var e=Object(p.a)(u.a.mark((function e(n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=c.a,e.t1=Object(c.a)({},n),e.t2={},e.next=5,t.getBlock(n.startBlockNumber);case 5:return e.t3=e.sent.timestamp,e.t4={timestamp:e.t3},e.abrupt("return",(0,e.t0)(e.t1,e.t2,e.t4));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 9:return(s=e.sent).push({index:r,startBlockNumber:1/0,timestamp:1/0}),d="0x000000000000000000000000"+n.replace(/^0x/,""),e.next=14,Object(j.a)(t,h,f,"LogDarknodeRegistered",[d]);case 14:return m=e.sent,e.next=17,Object(j.a)(t,h,f,"LogDarknodeDeregistered",[d]);case 17:return v=e.sent,e.next=20,Object(j.a)(t,h,f,"LogDarknodeRefunded",[d]);case 20:x=e.sent,k=[],O=Object(y.a)(m);try{for(D=function(){var e=M.value,t=v.filter((function(t){return t.blockNumber>e.blockNumber&&t.args._darknodeID===e.args._darknodeID}))[0],n=x.filter((function(t){return t.blockNumber>e.blockNumber&&t.args._darknodeID===e.args._darknodeID}))[0];k.push({darknodeID:e.args._darknodeID,registered:s.filter((function(t){return t.startBlockNumber>e.blockNumber}))[0].index,deregistered:t?s.filter((function(e){return e.startBlockNumber>t.blockNumber}))[0].index:void 0,refunded:n?s.filter((function(e){return e.startBlockNumber>n.blockNumber}))[0].index:void 0})},O.s();!(M=O.n()).done;)D()}catch(U){O.e(U)}finally{O.f()}return _=s[s.length-1-1].index,I=w(s),N=g(),e.t0=c.a,e.t1=c.a,e.t2={},e.next=32,I;case 32:return e.t3=e.sent,e.t4=(0,e.t1)(e.t2,e.t3),e.next=36,N;case 36:for(e.t5=e.sent,S=(0,e.t0)(e.t4,e.t5),E={},P=0,B=k;P<B.length;P++)for(R=B[P],C=R.registered;C<Math.min((R.deregistered||1/0)-1,_);C++)E[C]=(E[C]||0)+1;return L="Type,BuyAmount,BuyCurrency,SellAmount,SellCurrency,FeeAmount,FeeCurrency,Exchange,Group,Comment,Date\n",e.next=43,T();case 43:for(F in z=e.sent,A=function(e){for(var t in S[e]){var n=S[e][t]*E[e],a=z[t.replace(/^ren/,"")];if(void 0===a)throw new Error("Unable to fetch asset decimals for ".concat(t,"."));var r=n/Math.pow(10,a),i=s.filter((function(t){return t.index===parseInt(e,10)+1}))[0].timestamp,o=b()(1e3*i).format("MM/DD/YY HH:mm");L+="Income,".concat(r,",").concat(t,",,,,,Darknode,,,").concat(o,"\n")}},E)A(F);return e.abrupt("return",L);case 47:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function M(){return(M=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function D(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var _=a.createElement("g",{id:"Page-1",stroke:"none",strokeWidth:1,fill:"none",fillRule:"evenodd"},a.createElement("g",{id:"Logo",transform:"translate(10.000000, -8.000000)",fill:"#000000"},a.createElement("g",{id:"Group",transform:"translate(199.866957, 210.635678) rotate(-30.000000) translate(-199.866957, -210.635678) translate(39.866957, 69.635678)"},a.createElement("polygon",{id:"Path",points:"76.2756822 0 237.809906 0 255.836314 30.6115604 144.084707 30.6115604 144.084707 18.4072598 112.736975 18.4072598 112.736975 5.90311568 72.7250973 5.90311568"}),a.createElement("polygon",{id:"Path",points:"52.0000577 42 262.809906 42 280.836314 72.6115604 169.084707 72.6115604 169.084707 60.4072598 84.0613192 60.4072598 84.0613192 47.9031157 48.6220687 47.9031157"}),a.createElement("polygon",{id:"Path",points:"27.7723931 84 286.809906 84 304.836314 114.61156 200.555958 114.61156 200.555958 102.40726 59.1120723 102.40726 59.1120723 89.9031157 24.2218082 89.9031157"}),a.createElement("polygon",{id:"Path",points:"3.55058493 126 310.957535 126 319.07073 140.488017 309.999711 156.61156 195.107135 156.61156 195.107135 144.40726 43.854434 144.40726 43.854434 131.903116 -2.84217094e-14 131.903116"}),a.createElement("polygon",{id:"Path",points:"9.69127366 167 303.871627 167 286.131521 197.61156 171.102987 197.61156 171.102987 185.40726 42.2531737 185.40726 42.2531737 172.903116 13.3592664 172.903116"}),a.createElement("polygon",{id:"Path",points:"34.0050916 209 279.871627 209 262.131521 239.61156 147.102987 239.61156 147.102987 227.40726 69.3259998 227.40726 69.3259998 214.903116 37.6730844 214.903116"}),a.createElement("polygon",{id:"Path",points:"58.1026456 251.364322 254.999578 251.364322 237.259472 281.975883 117.257385 281.975883 117.257385 269.771582 89.8614223 269.771582 89.8614223 257.267438 61.7706384 257.267438"}))));function I(e,t){var n=e.title,r=e.titleId,s=D(e,["title","titleId"]);return a.createElement("svg",M({width:"419px",height:"405px",viewBox:"0 0 419 405",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",ref:t,"aria-labelledby":r},s),void 0===n?a.createElement("title",{id:r},"Group"):n?a.createElement("title",{id:r},n):null,_)}var N=a.forwardRef(I),S=(n.p,n(11));var E=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(!1),i=Object(l.a)(s,2),o=i[0],c=i[1],y=Object(a.useState)(),m=Object(l.a)(y,2),b=m[0],f=m[1],h=Object(a.useState)(),x=Object(l.a)(h,2),k=x[0],g=x[1],w=Object(a.useCallback)((function(e){r(e.target.value)}),[]),T=Object(a.useCallback)(function(){var e=Object(p.a)(u.a.mark((function e(t){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),c(!0),g(void 0),f(void 0),e.prev=4,a=new d.a(v),e.next=8,O(a,n);case 8:r=e.sent,g(r),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(4),f(e.t0.message);case 15:c(!1);case 16:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(t){return e.apply(this,arguments)}}(),[n]);return Object(S.jsxs)("div",{className:"my-10",children:[Object(S.jsx)("div",{className:"w-screen max-w-5xl ml-auto mr-auto p-1",children:Object(S.jsx)("div",{className:"container ml-auto mr-auto",children:Object(S.jsxs)("div",{className:"shadow sm:rounded-md sm:overflow-hidden",children:[Object(S.jsxs)("div",{className:"px-4 py-6 bg-white space-y-6 sm:px-6",children:[Object(S.jsxs)("div",{className:"flex items-center justify-left",children:[Object(S.jsx)(N,{className:"h-8 w-auto mr-2"}),Object(S.jsx)("h1",{children:"Darknode Income CSV"})]}),Object(S.jsxs)("p",{className:"mt-2 text-sm text-gray-500",children:["Enter your operator address below to generate a CSV containing Epoch income events. Rewards for multiple darknodes are combined into a single event per asset. The CSV format is compatible with"," ",Object(S.jsx)("a",{target:"_blank",rel:"noreferrer noopener",href:"https://tokentax.co",className:"text-blue-900",children:"TokenTax.co"}),"."]})]}),Object(S.jsx)("div",{className:"p-6 bg-gray-50 text-right",children:Object(S.jsxs)("form",{onSubmit:T,className:"flex items-center justify-center",children:[Object(S.jsx)("input",{id:"about",name:"about",type:"text",disabled:o,placeholder:"Operator Address",value:n,onChange:w,className:"p-2 shadow-sm focus:ring-blue-900 focus:border-blue-900 block w-full sm:text-sm border border-gray-300 rounded-l-md disabled:opacity-80"}),Object(S.jsx)("button",{type:"submit",disabled:o,className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:o?Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[Object(S.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),Object(S.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})," ","Calculating"]}):Object(S.jsx)(S.Fragment,{children:"Calculate"})})]})})]})})}),k?Object(S.jsx)("div",{className:"w-screen max-w-5xl mt-1 ml-auto mr-auto p-1",children:Object(S.jsx)("div",{className:"p-5 shadow sm:rounded-md sm:overflow-hidden container ml-auto mr-auto bg-gray-50",children:Object(S.jsx)("pre",{children:Object(S.jsx)("code",{children:k})})})}):null,b?Object(S.jsx)("div",{className:"w-screen max-w-5xl mt-1 ml-auto mr-auto p-1",children:Object(S.jsx)("div",{className:"p-5 shadow sm:rounded-md sm:overflow-hidden container ml-auto mr-auto bg-gray-50",children:Object(S.jsxs)("p",{className:"text-red",children:["Error: ",b]})})}):null]})};i.a.render(Object(S.jsx)(r.a.StrictMode,{children:Object(S.jsx)(E,{})}),document.getElementById("root"))},46:function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_darknodeOperator","type":"address"},{"indexed":true,"internalType":"address","name":"_darknodeID","type":"address"}],"name":"LogDarknodeDeregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IDarknodePayment","name":"_previousDarknodePayment","type":"address"},{"indexed":true,"internalType":"contract IDarknodePayment","name":"_nextDarknodePayment","type":"address"}],"name":"LogDarknodePaymentUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_darknodeOperator","type":"address"},{"indexed":true,"internalType":"address","name":"_darknodeID","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"LogDarknodeRefunded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_darknodeOperator","type":"address"},{"indexed":true,"internalType":"address","name":"_darknodeID","type":"address"},{"indexed":false,"internalType":"uint256","name":"_bond","type":"uint256"}],"name":"LogDarknodeRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_darknodeOperator","type":"address"},{"indexed":true,"internalType":"address","name":"_darknodeID","type":"address"},{"indexed":true,"internalType":"address","name":"_challenger","type":"address"},{"indexed":false,"internalType":"uint256","name":"_percentage","type":"uint256"}],"name":"LogDarknodeSlashed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_previousMinimumBond","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_nextMinimumBond","type":"uint256"}],"name":"LogMinimumBondUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_previousMinimumEpochInterval","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_nextMinimumEpochInterval","type":"uint256"}],"name":"LogMinimumEpochIntervalUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_previousMinimumPodSize","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_nextMinimumPodSize","type":"uint256"}],"name":"LogMinimumPodSizeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epochhash","type":"uint256"}],"name":"LogNewEpoch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_previousSlasher","type":"address"},{"indexed":true,"internalType":"address","name":"_nextSlasher","type":"address"}],"name":"LogSlasherUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"blacklistRecoverableToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"epochhash","type":"uint256"},{"internalType":"uint256","name":"blocktime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"darknodePayment","outputs":[{"internalType":"contract IDarknodePayment","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deregistrationInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumBond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumEpochInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumPodSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextMinimumBond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextMinimumEpochInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextMinimumPodSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextSlasher","outputs":[{"internalType":"contract IDarknodeSlasher","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numDarknodes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numDarknodesNextEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numDarknodesPreviousEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"previousEpoch","outputs":[{"internalType":"uint256","name":"epochhash","type":"uint256"},{"internalType":"uint256","name":"blocktime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"recoverTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ren","outputs":[{"internalType":"contract RenToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"slasher","outputs":[{"internalType":"contract IDarknodeSlasher","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"store","outputs":[{"internalType":"contract DarknodeRegistryStore","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_VERSION","type":"string"},{"internalType":"contract RenToken","name":"_renAddress","type":"address"},{"internalType":"contract DarknodeRegistryStore","name":"_storeAddress","type":"address"},{"internalType":"uint256","name":"_minimumBond","type":"uint256"},{"internalType":"uint256","name":"_minimumPodSize","type":"uint256"},{"internalType":"uint256","name":"_minimumEpochIntervalSeconds","type":"uint256"},{"internalType":"uint256","name":"_deregistrationIntervalSeconds","type":"uint256"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_nextOwner","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"},{"internalType":"bytes","name":"_publicKey","type":"bytes"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"deregister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"epoch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract DarknodeRegistryLogicV1","name":"_newOwner","type":"address"}],"name":"transferStoreOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimStoreOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IDarknodePayment","name":"_darknodePayment","type":"address"}],"name":"updateDarknodePayment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_nextMinimumBond","type":"uint256"}],"name":"updateMinimumBond","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_nextMinimumPodSize","type":"uint256"}],"name":"updateMinimumPodSize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_nextMinimumEpochInterval","type":"uint256"}],"name":"updateMinimumEpochInterval","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IDarknodeSlasher","name":"_slasher","type":"address"}],"name":"updateSlasher","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_guilty","type":"address"},{"internalType":"address","name":"_challenger","type":"address"},{"internalType":"uint256","name":"_percentage","type":"uint256"}],"name":"slash","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"refund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"getDarknodeOperator","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"getDarknodeBond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"getDarknodePublicKey","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_start","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"getDarknodes","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_start","type":"address"},{"internalType":"uint256","name":"_count","type":"uint256"}],"name":"getPreviousDarknodes","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isPendingRegistration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isPendingDeregistration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isDeregistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isDeregisterable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isRefunded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isRefundable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"darknodeID","type":"address"}],"name":"darknodeRegisteredAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"darknodeID","type":"address"}],"name":"darknodeDeregisteredAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_darknodeID","type":"address"}],"name":"isRegisteredInPreviousEpoch","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]')},47:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return d}));var a=n(1),r=n.n(a),s=n(32),i=n(89),o=n(26),u=n(67),p=function(e,t){var n=e.filter((function(e){return e.name===t}))[0];if(!n)throw new Error('No ABI entry found for "'.concat(t,'".'));return n},l=function(t){var n=t.inputs&&t.inputs.length>0?t.inputs.map((function(e){return e.type})).join(","):"",a="".concat(t.name,"(").concat(n,")");return Object(u.keccak256)(e.from(a))},d=function(){var e=Object(o.a)(r.a.mark((function e(t,n,a,o,d){var c,y,m,b;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=p(a,o),e.next=3,t.getLogs({address:n,fromBlock:1,toBlock:"latest",topics:[l(c)].concat(Object(i.a)(d||[]))});case 3:return y=e.sent,m=l(c),b=new u.Interface([c]),e.abrupt("return",y.filter((function(e){return e.topics[0]===m})).map((function(e){return Object(s.a)(Object(s.a)({},b.parseLog(e)),{},{transactionHash:e.transactionHash,blockNumber:e.blockNumber})})));case 7:case"end":return e.stop()}}),e)})));return function(t,n,a,r,s){return e.apply(this,arguments)}}()}).call(this,n(113).Buffer)},90:function(e,t,n){}},[[130,1,2]]]);
//# sourceMappingURL=main.d07c61f3.chunk.js.map