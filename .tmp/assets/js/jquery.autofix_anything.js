!function(t){var o={customOffset:!1,manual:!1,onlyInContainer:!0};t.fn.autofix_anything=function(e){var s=t.extend({},o,e),n=t(this),f=n.position(),l=s.customOffset,a=n.offset();n.addClass("autofix_sb"),t.fn.manualfix=function(){var o=t(this),e=o.offset();o.hasClass("fixed")?o.removeClass("fixed"):o.addClass("fixed").css({top:0,left:e.left,right:"auto",bottom:"auto"})},fixAll=function(o,e,s,n){0==e.customOffset&&(l=o.parent().offset().top),t(document).scrollTop()>l&&t(document).scrollTop()<=o.parent().height()+(l-t(window).height())?o.removeClass("bottom").addClass("fixed").css({top:0,left:n.left,right:"auto",bottom:"auto"}):t(document).scrollTop()>l?1==e.onlyInContainer&&(t(document).scrollTop()>o.parent().height()-t(window).height()?o.addClass("bottom fixed").removeAttr("style").css({left:s.left}):o.removeClass("bottom fixed").removeAttr("style")):o.removeClass("bottom fixed").removeAttr("style")},0==s.manual&&t(window).scroll(function(){fixAll(n,s,f,a)})}}(window.jQuery);