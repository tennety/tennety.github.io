(function(e,t,n,r){"use strict";Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"4.2.0",settings:{timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,bullets:!0,stack_on_small:!0,navigation_arrows:!0,slide_number:!0,container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning"},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options"),typeof n=="object"&&e.extend(!0,i.settings,n);if(e(t).is("[data-orbit]")){var s=e.extend(!0,{},i);s._init(idx,el)}e("[data-orbit]",t).each(function(t,n){var r=e.extend(!0,{},i);r._init(t,n)})},_container_html:function(){var e=this;return'<div class="'+e.settings.container_class+'"></div>'},_bullets_container_html:function(t){var n=this,r=e('<ol class="'+n.settings.bullets_container_class+'"></ol>');return t.each(function(t,i){var s=e('<li data-orbit-slide-number="'+(t+1)+'" class=""></li>');t===0&&s.addClass(n.settings.bullets_active_class),r.append(s)}),r},_slide_number_html:function(t,n){var r=this,i=e('<div class="'+r.settings.slide_number_class+'"></div>');return i.append("<span>"+t+"</span> of <span>"+n+"</span>"),i},_timer_html:function(){var e=this;return typeof e.settings.timer_speed=="number"&&e.settings.timer_speed>0?'<div class="'+e.settings.timer_container_class+'"><span></span><div class="'+e.settings.timer_progress_class+'"></div></div>':""},_next_html:function(){var e=this;return'<a href="#" class="'+e.settings.next_class+'">Next <span></span></a>'},_prev_html:function(){var e=this;return'<a href="#" class="'+e.settings.prev_class+'">Prev <span></span></a>'},_init:function(t,n){var r=this,i=e(n),s=i.wrap(r._container_html()).parent(),o=i.children();e.extend(!0,r.settings,r.data_options(i)),r.settings.navigation_arrows&&(s.append(r._prev_html()),s.append(r._next_html())),i.addClass(r.settings.slides_container_class),r.settings.stack_on_small&&s.addClass(r.settings.stack_on_small_class),r.settings.slide_number&&s.append(r._slide_number_html(1,o.length)),s.append(r._timer_html()),r.settings.bullets&&s.after(r._bullets_container_html(o)),i.append(o.first().clone().attr("data-orbit-slide","")),i.prepend(o.last().clone().attr("data-orbit-slide","")),i.css(Foundation.rtl?"marginRight":"marginLeft","-100%"),o.first().addClass(r.settings.active_slide_class),r._init_events(i),r._init_dimensions(i),r._start_timer(i)},_init_events:function(i){var s=this,o=i.parent();e(t).on("load.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height())),i.trigger("orbit:ready")}).on("resize.fndtn.orbit",function(){i.height(""),i.height(i.height(o.height()))}),e(n).on("click.fndtn.orbit","[data-orbit-link]",function(t){t.preventDefault();var n=e(t.currentTarget).attr("data-orbit-link"),r=i.find("[data-orbit-slide="+n+"]").first();r.length===1&&(s._reset_timer(i,!0),s._goto(i,r.index(),function(){}))}),o.siblings("."+s.settings.bullets_container_class).on("click.fndtn.orbit","[data-orbit-slide-number]",function(t){t.preventDefault(),s._reset_timer(i,!0),s._goto(i,e(t.currentTarget).data("orbit-slide-number"),function(){})}),o.on("mouseenter.fndtn.orbit",function(e){s.settings.pause_on_hover&&s._stop_timer(i)}).on("mouseleave.fndtn.orbit",function(e){s.settings.resume_on_mouseout&&s._start_timer(i)}).on("orbit:after-slide-change.fndtn.orbit",function(e,t){var n=o.find("."+s.settings.slide_number_class);n.length===1&&n.replaceWith(s._slide_number_html(t.slide_number,t.total_slides))}).on("orbit:next-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.next_class,function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"next",function(){})}).on("orbit:prev-slide.fndtn.orbit click.fndtn.orbit","."+s.settings.prev_class,function(e){e.preventDefault(),s._reset_timer(i,!0),s._goto(i,"prev",function(){})}).on("orbit:toggle-play-pause.fndtn.orbit click.fndtn.orbit touchstart.fndtn.orbit","."+s.settings.timer_container_class,function(t){t.preventDefault();var n=e(t.currentTarget).toggleClass(s.settings.timer_paused_class),r=n.closest("."+s.settings.container_class).find("."+s.settings.slides_container_class);n.hasClass(s.settings.timer_paused_class)?s._stop_timer(r):s._start_timer(r)}).on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};o.data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=o.data("swipe-transition");typeof t=="undefined"&&(t={}),t.delta_x=e.touches[0].pageX-t.start_page_x,typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault(),s._stop_timer(i);var n=t.delta_x<0?"next":"prev";t.active=!0,s._goto(i,n,function(){})}}).on("touchend.fndtn.orbit",function(e){o.data("swipe-transition",{}),e.stopPropagation()})},_init_dimensions:function(e){var t=e.parent(),n=e.children();e.css("width",n.length*100+"%"),n.css("width",100/n.length+"%"),e.height(t.height()),e.css("width",n.length*100+"%")},_start_timer:function(e){var t=this,n=e.parent(),r=function(){t._reset_timer(e,!1),t._goto(e,"next",function(){t._start_timer(e)})},i=n.find("."+t.settings.timer_container_class),s=i.find("."+t.settings.timer_progress_class),o=s.width()/i.width(),u=t.settings.timer_speed-o*t.settings.timer_speed;s.animate({width:"100%"},u,"linear",r),e.trigger("orbit:timer-started")},_stop_timer:function(e){var t=this,n=e.parent(),r=n.find("."+t.settings.timer_container_class),i=r.find("."+t.settings.timer_progress_class),s=i.width()/r.width();t._rebuild_timer(n,s*100+"%"),e.trigger("orbit:timer-stopped"),r=n.find("."+t.settings.timer_container_class),r.addClass(t.settings.timer_paused_class)},_reset_timer:function(e,t){var n=this,r=e.parent();n._rebuild_timer(r,"0%");if(typeof t=="boolean"&&t){var i=r.find("."+n.settings.timer_container_class);i.addClass(n.settings.timer_paused_class)}},_rebuild_timer:function(t,n){var r=this,i=t.find("."+r.settings.timer_container_class),s=e(r._timer_html()),o=s.find("."+r.settings.timer_progress_class);if(typeof Zepto=="function")i.remove(),t.append(s),o.css("width",n);else if(typeof jQuery=="function"){var u=i.find("."+r.settings.timer_progress_class);u.css("width",n),u.stop()}},_goto:function(t,n,r){var i=this,s=t.parent(),o=t.children(),u=t.find("."+i.settings.active_slide_class),a=u.index(),f=Foundation.rtl?"marginRight":"marginLeft";if(s.hasClass(i.settings.orbit_transition_class))return!1;n==="prev"?a===0?a=o.length-1:a--:n==="next"?a=(a+1)%o.length:typeof n=="number"&&(a=n%o.length),a===o.length-1&&n==="next"?(t.css(f,"0%"),a=1):a===0&&n==="prev"&&(t.css(f,"-"+(o.length-1)*100+"%"),a=o.length-2),s.addClass(i.settings.orbit_transition_class),u.removeClass(i.settings.active_slide_class),e(o[a]).addClass(i.settings.active_slide_class);var l=s.siblings("."+i.settings.bullets_container_class);l.length===1&&(l.children().removeClass(i.settings.bullets_active_class),e(l.children()[a-1]).addClass(i.settings.bullets_active_class));var c="-"+a*100+"%";t.trigger("orbit:before-slide-change");if(t.css(f)===c)s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r();else{var h={};h[f]=c,t.animate(h,i.settings.animation_speed,"linear",function(){s.removeClass(i.settings.orbit_transition_class),t.trigger("orbit:after-slide-change",[{slide_number:a,total_slides:t.children().length-2}]),r()})}}}})(Foundation.zj,this,this.document);