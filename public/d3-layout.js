(function(){function bc(a,b){var c=a.x+b[3],d=a.y+b[0],e=a.dx-b[1]-b[3],f=a.dy-b[0]-b[2];e<0&&(c+=e/2,e=0),f<0&&(d+=f/2,f=0);return{x:c,y:d,dx:e,dy:f}}function bb(a){return{x:a.x,y:a.y,dx:a.dx,dy:a.dy}}function ba(a,b,c){return a._tree.ancestor.parent==b.parent?a._tree.ancestor:c}function _(a,b,c){a=a._tree,b=b._tree;var d=c/(b.number-a.number);a.change+=d,b.change-=d,b.shift+=c,b.prelim+=c,b.mod+=c}function $(a){var b=0,c=0,d=a.children,e=d.length,f;while(--e>=0)f=d[e]._tree,f.prelim+=b,f.mod+=b,b+=f.shift+(c+=f.change)}function Z(a,b){function c(a,d){var e=a.children;if(e){var f,g=null,h=-1,i=e.length;while(++h<i)f=e[h],c(f,g),g=f}b(a,d)}c(a,null)}function Y(a,b){return a.depth-b.depth}function X(a,b){return b.x-a.x}function W(a,b){return a.x-b.x}function V(a,b){var c=a.children;if(c){var d,e=c.length,f=-1;while(++f<e)b(d=V(c[f],b),a)>0&&(a=d)}return a}function U(a){return a.children?a.children[a.children.length-1]:a._tree.thread}function T(a){return a.children?a.children[0]:a._tree.thread}function S(a,b){return a.parent==b.parent?1:2}function R(a){var b=a.children;return b?R(b[b.length-1]):a}function Q(a){var b=a.children;return b?Q(b[0]):a}function P(a){return a.reduce(function(a,b){return a+b.x},0)/a.length}function O(a){return 1+d3.max(a,function(a){return a.y})}function N(a,b,c){var d=b.r+c.r,e=a.r+c.r,f=b.x-a.x,g=b.y-a.y,h=Math.sqrt(f*f+g*g),i=(e*e+h*h-d*d)/(2*e*h),j=Math.acos(i),k=i*e,l=Math.sin(j)*e;f/=h,g/=h,c.x=a.x+k*f+l*g,c.y=a.y+k*g-l*f}function M(a,b,c,d){var e=a.children;a.x=b+=d*a.x,a.y=c+=d*a.y,a.r*=d;if(e){var f=-1,g=e.length;while(++f<g)M(e[f],b,c,d)}}function L(a){var b=a.children;b?(b.forEach(L),a.r=I(b)):a.r=Math.sqrt(a.value)}function K(a){delete a._pack_next,delete a._pack_prev}function J(a){a._pack_next=a._pack_prev=a}function I(a){function l(a){b=Math.min(a.x-a.r,b),c=Math.max(a.x+a.r,c),d=Math.min(a.y-a.r,d),e=Math.max(a.y+a.r,e)}var b=Infinity,c=-Infinity,d=Infinity,e=-Infinity,f=a.length,g,h,i,j,k;a.forEach(J),g=a[0],g.x=-g.r,g.y=0,l(g);if(f>1){h=a[1],h.x=h.r,h.y=0,l(h);if(f>2){i=a[2],N(g,h,i),l(i),F(g,i),g._pack_prev=i,F(i,h),h=g._pack_next;for(var m=3;m<f;m++){N(g,h,i=a[m]);var n=0,o=1,p=1;for(j=h._pack_next;j!==h;j=j._pack_next,o++)if(H(j,i)){n=1;break}if(n==1)for(k=g._pack_prev;k!==j._pack_prev;k=k._pack_prev,p++)if(H(k,i)){p<o&&(n=-1,j=k);break}n==0?(F(g,i),h=i,l(i)):n>0?(G(g,j),h=j,m--):(G(j,h),g=j,m--)}}}var q=(b+c)/2,r=(d+e)/2,s=0;for(var m=0;m<f;m++){var t=a[m];t.x-=q,t.y-=r,s=Math.max(s,t.r+Math.sqrt(t.x*t.x+t.y*t.y))}a.forEach(K);return s}function H(a,b){var c=b.x-a.x,d=b.y-a.y,e=a.r+b.r;return e*e-c*c-d*d>.001}function G(a,b){a._pack_next=b,b._pack_prev=a}function F(a,b){var c=a._pack_next;a._pack_next=b,b._pack_prev=a,b._pack_next=c,c._pack_prev=b}function E(a,b){return a.value-b.value}function C(a){return d3.merge(a.map(function(a){return(a.children||[]).map(function(b){return{source:a,target:b}})}))}function B(a,b){return b.value-a.value}function A(a){return a.value}function z(a){return a.children}function y(a,b){a.sort=d3.rebind(a,b.sort),a.children=d3.rebind(a,b.children),a.links=C,a.value=d3.rebind(a,b.value),a.nodes=function(b){D=!0;return(a.nodes=a)(b)};return a}function x(a){return[d3.min(a),d3.max(a)]}function w(a,b){var c=-1,d=+a[0],e=(a[1]-d)/b,f=[];while(++c<=b)f[c]=e*c+d;return f}function v(a,b){return w(a,Math.ceil(Math.log(b.length)/Math.LN2+1))}function u(a,b){return a+b[1]}function t(a){return a.reduce(u,0)}function s(a){var b=1,c=0,d=a[0][1],e,f=a.length;for(;b<f;++b)(e=a[b][1])>d&&(c=b,d=e);return c}function p(a,b,c){a.y0=b,a.y=c}function o(a){return a.y}function n(a){return a.x}function m(a){return 1}function l(a){return 20}function k(a){var b=0,c=0;a.count=0;if(!a.leaf){var d=a.nodes,e=d.length,f=-1,g;while(++f<e){g=d[f];if(g==null)continue;k(g),a.count+=g.count,b+=g.count*g.cx,c+=g.count*g.cy}}a.point&&(a.leaf||(a.point.x+=Math.random()-.5,a.point.y+=Math.random()-.5),a.count++,b+=a.point.x,c+=a.point.y),a.cx=b/a.count,a.cy=c/a.count}function j(){f.px+=d3.event.dx,f.py+=d3.event.dy,e.resume()}function i(){j(),f.fixed&=1,e=f=null}function h(a){a!==f&&(a.fixed&=1)}function g(a){a.fixed|=2}function c(a,c){if(a===c)return a;var d=b(a),e=b(c),f=d.pop(),g=e.pop(),h=null;while(f===g)h=f,f=d.pop(),g=e.pop();return h}function b(a){var b=[],c=a.parent;while(c!=null)b.push(a),a=c,c=c.parent;b.push(a);return b}function a(a){var b=a.source,d=a.target,e=c(b,d),f=[b];while(b!==e)b=b.parent,f.push(b);var g=f.length;while(d!==e)f.splice(g,0,d),d=d.parent;return f}d3.layout={},d3.layout.bundle=function(){return function(b){var c=[],d=-1,e=b.length;while(++d<e)c.push(a(b[d]));return c}},d3.layout.chord=function(){function k(){b.sort(function(a,b){return i(a.target.value,b.target.value)})}function j(){var a={},j=[],l=d3.range(e),m=[],n,o,p,q,r;b=[],c=[],n=0,q=-1;while(++q<e){o=0,r=-1;while(++r<e)o+=d[q][r];j.push(o),m.push(d3.range(e)),n+=o}g&&l.sort(function(a,b){return g(j[a],j[b])}),h&&m.forEach(function(a,b){a.sort(function(a,c){return h(d[b][a],d[b][c])})}),n=(2*Math.PI-f*e)/n,o=0,q=-1;while(++q<e){p=o,r=-1;while(++r<e){var s=l[q],t=m[q][r],u=d[s][t];a[s+"-"+t]={index:s,subindex:t,startAngle:o,endAngle:o+=u*n,value:u}}c.push({index:s,startAngle:p,endAngle:o,value:(o-p)/n}),o+=f}q=-1;while(++q<e){r=q-1;while(++r<e){var v=a[q+"-"+r],w=a[r+"-"+q];(v.value||w.value)&&b.push(v.value<w.value?{source:w,target:v}:{source:v,target:w})}}i&&k()}var a={},b,c,d,e,f=0,g,h,i;a.matrix=function(f){if(!arguments.length)return d;e=(d=f)&&d.length,b=c=null;return a},a.padding=function(d){if(!arguments.length)return f;f=d,b=c=null;return a},a.sortGroups=function(d){if(!arguments.length)return g;g=d,b=c=null;return a},a.sortSubgroups=function(c){if(!arguments.length)return h;h=c,b=null;return a},a.sortChords=function(c){if(!arguments.length)return i;i=c,b&&k();return a},a.chords=function(){b||j();return b},a.groups=function(){c||j();return c};return a},d3.layout.force=function(){function B(b){g(f=b),e=a}function A(){var a=v.length,d=w.length,e,f,g,h,i,j,l,m,p;for(f=0;f<d;++f){g=w[f],h=g.source,i=g.target,m=i.x-h.x,p=i.y-h.y;if(j=m*m+p*p)j=n*y[f]*((j=Math.sqrt(j))-x[f])/j,m*=j,p*=j,i.x-=m*(l=h.weight/(i.weight+h.weight)),i.y-=p*l,h.x+=m*(l=1-l),h.y+=p*l}if(l=n*s){m=c[0]/2,p=c[1]/2,f=-1;if(l)while(++f<a)g=v[f],g.x+=(m-g.x)*l,g.y+=(p-g.y)*l}if(l=n*r){k(e=d3.geom.quadtree(v)),f=-1;while(++f<a)(g=v[f]).fixed||e.visit(z(g,l))}f=-1;while(++f<a)g=v[f],g.fixed?(g.x=g.px,g.y=g.py):(g.x-=(g.px-(g.px=g.x))*o,g.y-=(g.py-(g.py=g.y))*o);b.tick.dispatch({type:"tick",alpha:n});return(n*=.99)<.005}function z(a,b){return function(c,d,e,f,g){if(c.point!==a){var h=c.cx-a.x,i=c.cy-a.y,j=1/Math.sqrt(h*h+i*i);if((f-d)*j<t){var k=b*c.count*j*j;a.px-=h*k,a.py-=i*k;return!0}if(c.point&&isFinite(j)){var k=b*j*j;a.px-=h*k,a.py-=i*k}}}}var a={},b=d3.dispatch("tick"),c=[1,1],d,n,o=.9,p=l,q=m,r=-30,s=.1,t=.8,u,v=[],w=[],x,y;a.on=function(c,d){b[c].add(d);return a},a.nodes=function(b){if(!arguments.length)return v;v=b;return a},a.links=function(b){if(!arguments.length)return w;w=b;return a},a.size=function(b){if(!arguments.length)return c;c=b;return a},a.linkDistance=function(b){if(!arguments.length)return p;p=d3.functor(b);return a},a.distance=a.linkDistance,a.linkStrength=function(b){if(!arguments.length)return q;q=d3.functor(b);return a},a.friction=function(b){if(!arguments.length)return o;o=b;return a},a.charge=function(b){if(!arguments.length)return r;r=b;return a},a.gravity=function(b){if(!arguments.length)return s;s=b;return a},a.theta=function(b){if(!arguments.length)return t;t=b;return a},a.start=function(){function l(){if(!i){i=[];for(d=0;d<e;++d)i[d]=[];for(d=0;d<f;++d){var a=w[d];i[a.source.index].push(a.target),i[a.target.index].push(a.source)}}return i[b]}function k(a,c){var d=l(b),e=-1,f=d.length,g;while(++e<f)if(!isNaN(g=d[e][a]))return g;return Math.random()*c}var b,d,e=v.length,f=w.length,g=c[0],h=c[1],i,j;for(b=0;b<e;++b)(j=v[b]).index=b,j.weight=0;x=[],y=[];for(b=0;b<f;++b)j=w[b],typeof j.source=="number"&&(j.source=v[j.source]),typeof j.target=="number"&&(j.target=v[j.target]),x[b]=p.call(this,j,b),y[b]=q.call(this,j,b),++j.source.weight,++j.target.weight;for(b=0;b<e;++b)j=v[b],isNaN(j.x)&&(j.x=k("x",g)),isNaN(j.y)&&(j.y=k("y",h)),isNaN(j.px)&&(j.px=j.x),isNaN(j.py)&&(j.py=j.y);return a.resume()},a.resume=function(){n=.1,d3.timer(A);return a},a.stop=function(){n=0;return a},a.drag=function(){d||(d=d3.behavior.drag().on("dragstart",B).on("drag",j).on("dragend",i)),this.on("mouseover.force",g).on("mouseout.force",h).call(d)};return a};var e,f;d3.layout.partition=function(){function e(e,f){var g=a.call(this,e,f);c(g[0],0,b[0],b[1]/d(g[0]));return g}function d(a){var b=a.children,c=0;if(b){var e=-1,f=b.length;while(++e<f)c=Math.max(c,d(b[e]))}return 1+c}function c(a,b,d,e){var f=a.children;a.x=b,a.y=a.depth*e,a.dx=d,a.dy=e;if(f){var g=-1,h=f.length,i,j;d=a.value?d/a.value:0;while(++g<h)c(i=f[g],b,j=i.value*d,e),b+=j}}var a=d3.layout.hierarchy(),b=[1,1];e.size=function(a){if(!arguments.length)return b;b=a;return e};return y(e,a)},d3.layout.pie=function(){function f(f,g){var h=+(typeof c=="function"?c.apply(this,arguments):c),i=(typeof e=="function"?e.apply(this,arguments):e)-c,j=d3.range(f.length);b!=null&&j.sort(function(a,c){return b(f[a],f[c])});var k=f.map(a);i/=k.reduce(function(a,b){return a+b},0);var l=j.map(function(a){return{data:f[a],value:d=k[a],startAngle:h,endAngle:h+=d*i}});return f.map(function(a,b){return l[j[b]]})}var a=Number,b=null,c=0,e=2*Math.PI;f.value=function(b){if(!arguments.length)return a;a=b;return f},f.sort=function(a){if(!arguments.length)return b;b=a;return f},f.startAngle=function(a){if(!arguments.length)return c;c=a;return f},f.endAngle=function(a){if(!arguments.length)return e;e=a;return f};return f},d3.layout.stack=function(){function g(h,i){var j=h.map(function(b,c){return a.call(g,b,c)}),k=j.map(function(a,b){return a.map(function(a,b){return[e.call(g,a,b),f.call(g,a,b)]})}),l=b.call(g,k,i);j=d3.permute(j,l),k=d3.permute(k,l);var m=c.call(g,k,i),n=j.length,o=j[0].length,p,q,r;for(q=0;q<o;++q){d.call(g,j[0][q],r=m[q],k[0][q][1]);for(p=1;p<n;++p)d.call(g,j[p][q],r+=k[p-1][q][1],k[p][q][1])}return h}var a=Object,b=q["default"],c=r.zero,d=p,e=n,f=o;g.values=function(b){if(!arguments.length)return a;a=b;return g},g.order=function(a){if(!arguments.length)return b;b=typeof a=="function"?a:q[a];return g},g.offset=function(a){if(!arguments.length)return c;c=typeof a=="function"?a:r[a];return g},g.x=function(a){if(!arguments.length)return e;e=a;return g},g.y=function(a){if(!arguments.length)return f;f=a;return g},g.out=function(a){if(!arguments.length)return d;d=a;return g};return g};var q={"inside-out":function(a){var b=a.length,c,d,e=a.map(s),f=a.map(t),g=d3.range(b).sort(function(a,b){return e[a]-e[b]}),h=0,i=0,j=[],k=[];for(c=0;c<b;++c)d=g[c],h<i?(h+=f[d],j.push(d)):(i+=f[d],k.push(d));return k.reverse().concat(j)},reverse:function(a){return d3.range(a.length).reverse()},"default":function(a){return d3.range(a.length)}},r={silhouette:function(a){var b=a.length,c=a[0].length,d=[],e=0,f,g,h,i=[];for(g=0;g<c;++g){for(f=0,h=0;f<b;f++)h+=a[f][g][1];h>e&&(e=h),d.push(h)}for(g=0;g<c;++g)i[g]=(e-d[g])/2;return i},wiggle:function(a){var b=a.length,c=a[0],d=c.length,e=0,f,g,h,i,j,k,l,m,n,o=[];o[0]=m=n=0;for(g=1;g<d;++g){for(f=0,i=0;f<b;++f)i+=a[f][g][1];for(f=0,j=0,l=c[g][0]-c[g-1][0];f<b;++f){for(h=0,k=(a[f][g][1]-a[f][g-1][1])/(2*l);h<f;++h)k+=(a[h][g][1]-a[h][g-1][1])/l;j+=k*a[f][g][1]}o[g]=m-=i?j/i*l:0,m<n&&(n=m)}for(g=0;g<d;++g)o[g]-=n;return o},expand:function(a){var b=a.length,c=a[0].length,d=1/b,e,f,g,h=[];for(f=0;f<c;++f){for(e=0,g=0;e<b;e++)g+=a[e][f][1];if(g)for(e=0;e<b;e++)a[e][f][1]/=g;else for(e=0;e<b;e++)a[e][f][1]=d}for(f=0;f<c;++f)h[f]=0;return h},zero:function(a){var b=-1,c=a[0].length,d=[];while(++b<c)d[b]=0;return d}};d3.layout.histogram=function(){function e(e,f){var g=[],h=e.map(b,this),i=c.call(this,h,f),j=d.call(this,i,h,f),k,f=-1,l=h.length,m=j.length-1,n=a?1:1/l,o;while(++f<m)k=g[f]=[],k.dx=j[f+1]-(k.x=j[f]),k.y=0;f=-1;while(++f<l)o=h[f],o>=i[0]&&o<=i[1]&&(k=g[d3.bisect(j,o,1,m)-1],k.y+=n,k.push(e[f]));return g}var a=!0,b=Number,c=x,d=v;e.value=function(a){if(!arguments.length)return b;b=a;return e},e.range=function(a){if(!arguments.length)return c;c=d3.functor(a);return e},e.bins=function(a){if(!arguments.length)return d;d=typeof a=="number"?function(b){return w(b,a)}:d3.functor(a);return e},e.frequency=function(b){if(!arguments.length)return a;a=!!b;return e};return e},d3.layout.hierarchy=function(){function g(a){var b=[];e(a,0,b);return b}function f(a,b){var d=a.children,e=0;if(d){var h=-1,i=d.length,j=b+1;while(++h<i)e+=f(d[h],j)}else c&&(e=+c.call(g,D?a:a.data,b)||0);c&&(a.value=e);return e}function e(f,h,i){var j=b.call(g,f,h),k=D?f:{data:f};k.depth=h,i.push(k);if(j){var l=-1,m=j.length,n=k.children=[],o=0,p=h+1;while(++l<m)d=e(j[l],p,i),d.parent=k,n.push(d),o+=d.value;a&&n.sort(a),c&&(k.value=o)}else c&&(k.value=+c.call(g,f,h)||0);return k}var a=B,b=z,c=A;g.sort=function(b){if(!arguments.length)return a;a=b;return g},g.children=function(a){if(!arguments.length)return b;b=a;return g},g.value=function(a){if(!arguments.length)return c;c=a;return g},g.revalue=function(a){f(a,0);return a};return g};var D=!1;d3.layout.pack=function(){function c(c,d){var e=a.call(this,c,d),f=e[0];f.x=0,f.y=0,L(f);var g=b[0],h=b[1],i=1/Math.max(2*f.r/g,2*f.r/h);M(f,g/2,h/2,i);return e}var a=d3.layout.hierarchy().sort(E),b=[1,1];c.size=function(a){if(!arguments.length)return b;b=a;return c};return y(c,a)},d3.layout.cluster=function(){function d(d,e){var f=a.call(this,d,e),g=f[0],h,i=0,j,k;Z(g,function(a){a.children?(a.x=P(a.children),a.y=O(a.children)):(a.x=h?i+=b(a,h):0,a.y=0,h=a)});var l=Q(g),m=R(g),n=l.x-b(l,m)/2,o=m.x+b(m,l)/2;Z(g,function(a){a.x=(a.x-n)/(o-n)*c[0],a.y=(1-a.y/g.y)*c[1]});return f}var a=d3.layout.hierarchy().sort(null).value(null),b=S,c=[1,1];d.separation=function(a){if(!arguments.length)return b;b=a;return d},d.size=function(a){if(!arguments.length)return c;c=a;return d};return y(d,a)},d3.layout.tree=function(){function d(d,e){function j(a,c,d){if(c){var e=a,f=a,g=c,h=a.parent.children[0],i=e._tree.mod,j=f._tree.mod,k=g._tree.mod,l=h._tree.mod,m;while(g=U(g),e=T(e),g&&e)h=T(h),f=U(f),f._tree.ancestor=a,m=g._tree.prelim+k-e._tree.prelim-i+b(g,e),m>0&&(_(ba(g,a,d),a,m),i+=m,j+=m),k+=g._tree.mod,i+=e._tree.mod,l+=h._tree.mod,j+=f._tree.mod;g&&!U(f)&&(f._tree.thread=g,f._tree.mod+=k-j),e&&!T(h)&&(h._tree.thread=e,h._tree.mod+=i-l,d=a)}return d}function i(a,b){a.x=a._tree.prelim+b;var c=a.children;if(c){var d=-1,e=c.length;b+=a._tree.mod;while(++d<e)i(c[d],b)}}function h(a,c){var d=a.children,e=a._tree;if(d&&(f=d.length)){var f,g=d[0],i,k=g,l,m=-1;while(++m<f)l=d[m],h(l,i),k=j(l,i,k),i=l;$(a);var n=.5*(g._tree.prelim+l._tree.prelim);c?(e.prelim=c._tree.prelim+b(a,c),e.mod=e.prelim-n):e.prelim=n}else c&&(e.prelim=c._tree.prelim+b(a,c))}var f=a.call(this,d,e),g=f[0];Z(g,function(a,b){a._tree={ancestor:a,prelim:0,mod:0,change:0,shift:0,number:b?b._tree.number+1:0}}),h(g),i(g,-g._tree.prelim);var k=V(g,X),l=V(g,W),m=V(g,Y),n=k.x-b(k,l)/2,o=l.x+b(l,k)/2,p=m.depth||1;Z(g,function(a){a.x=(a.x-n)/(o-n)*c[0],a.y=a.depth/p*c[1],delete a._tree});return f}var a=d3.layout.hierarchy().sort(null).value(null),b=S,c=[1,1];d.separation=function(a){if(!arguments.length)return b;b=a;return d},d.size=function(a){if(!arguments.length)return c;c=a;return d};return y(d,a)},d3.layout.treemap=function(){function n(b){var d=g||a(b),e=d[0];e.x=0,e.y=0,e.dx=c[0],e.dy=c[1],g&&a.revalue(e),i([e],e.dx*e.dy/e.value),(g?k:j)(e),f&&(g=d);return d}function m(a,c,d,e){var f=-1,g=a.length,h=d.x,i=d.y,j=c?b(a.area/c):0,k;if(c==d.dx){if(e||j>d.dy)j=j?d.dy:0;while(++f<g)k=a[f],k.x=h,k.y=i,k.dy=j,h+=k.dx=j?b(k.area/j):0;k.z=!0,k.dx+=d.x+d.dx-h,d.y+=j,d.dy-=j}else{if(e||j>d.dx)j=j?d.dx:0;while(++f<g)k=a[f],k.x=h,k.y=i,k.dx=j,i+=k.dy=j?b(k.area/j):0;k.z=!1,k.dy+=d.y+d.dy-i,d.x+=j,d.dx-=j}}function l(a,b){var c=a.area,d,e=0,f=Infinity,g=-1,i=a.length;while(++g<i){if(!(d=a[g].area))continue;d<f&&(f=d),d>e&&(e=d)}c*=c,b*=b;return c?Math.max(b*e*h/c,c/(b*f*h)):Infinity}function k(a){if(!!a.children){var b=e(a),c=a.children.slice(),d,f=[];i(c,b.dx*b.dy/a.value),f.area=0;while(d=c.pop())f.push(d),f.area+=d.area,d.z!=null&&(m(f,d.z?b.dx:b.dy,b,!c.length),f.length=f.area=0);a.children.forEach(k)}}function j(a){if(!!a.children){var b=e(a),c=[],d=a.children.slice(),f,g=Infinity,h,k=Math.min(b.dx,b.dy),n;i(d,b.dx*b.dy/a.value),c.area=0;while((n=d.length)>0)c.push(f=d[n-1]),c.area+=f.area,(h=l(c,k))<=g?(d.pop(),g=h):(c.area-=c.pop().area,m(c,k,b,!1),k=Math.min(b.dx,b.dy),c.length=c.area=0,g=Infinity);c.length&&(m(c,k,b,!0),c.length=c.area=0),a.children.forEach(j)}}function i(a,b){var c=-1,d=a.length,e,f;while(++c<d)f=(e=a[c]).value*(b<0?0:b),e.area=isNaN(f)||f<=0?0:f}var a=d3.layout.hierarchy(),b=Math.round,c=[1,1],d=null,e=bb,f=!1,g,h=.5*(1+Math.sqrt(5));n.size=function(a){if(!arguments.length)return c;c=a;return n},n.padding=function(a){function c(b){return bc(b,a)}function b(b){var c=a.call(n,b,b.depth);return c==null?bb(b):bc(b,typeof c=="number"?[c,c,c,c]:c)}if(!arguments.length)return d;var f;e=(d=a)==null?bb:(f=typeof a)==="function"?b:f==="number"?(a=[a,a,a,a],c):c;return n},n.round=function(a){if(!arguments.length)return b!=Number;b=a?Math.round:Number;return n},n.sticky=function(a){if(!arguments.length)return f;f=a,g=null;return n},n.ratio=function(a){if(!arguments.length)return h;h=a;return n};return y(n,a)}})()
