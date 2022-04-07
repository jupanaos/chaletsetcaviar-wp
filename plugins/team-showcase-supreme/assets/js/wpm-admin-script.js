jQuery.fn.extend({
  live: function (event, callback) {
    if (this.selector) {
      jQuery(document).on(event, this.selector, callback);
    }
    return this;
  },
});

jQuery.fn.extend({
  size: function (event, callback) {
    if (this.selector) {
      jQuery(document).on(event, this.selector, callback);
    }
    return this;
  },
});

jQuery(document).ready(function () {
  wpm_6310_toggle_service();
  var code = jQuery(".codemirror-textarea")[0];
  if (code) {
    var editor = CodeMirror.fromTextArea(code, {
      mode: "text/html",
      tabMode: "indent",
      autoCloseTags: true,
      lineNumbers: true,
      fixedGutter: true,
      lineWrapping: true,
      autoCloseBrackets: true,
    });
  }

  jQuery(
    "#tab-2, #tab-3, #tab-4, #tab-5, #tab-6, #tab-7, #tab-8, #tab-9, #tab-10, #tab-11, #tab-12, #tab-13"
  ).hide();
  jQuery("body").on("click", ".wpm-mytab", function () {
    jQuery(".wpm-mytab").removeClass("active");
    jQuery(this).addClass("active");
    var ids = jQuery(this).attr("id");
    ids = parseInt(ids.substring(3));
    jQuery(
      "#tab-1, #tab-2, #tab-3, #tab-4, #tab-5, #tab-6, #tab-7, #tab-8, #tab-9, #tab-10, #tab-11, #tab-12, #tab-13"
    ).hide();
    jQuery("#tab-" + ids).show();
    jQuery("#tab6").click(function (event) {
      jQuery(".codemirror-textarea").focus();
    });
    return false;
  });

  jQuery.getJSON(
    "https://wpmart.org/wp-content/uploads/services/services.php",
    function (data) {
      let summary = data.summary;
      let details = data.details;
      console.log("data", data, summary);
      let htmlCode = "";
      if (summary.length && jQuery(".wpm-6310-services-summary").length) {
        for (let i = 0; i < summary.length; i++) {
          htmlCode += `
          <a href="${summary[i].url}" target="_blank" title="${summary[i].title}">
              <div class="wpm-6310-col-4">
                <div class="wpm-content-wrapper">
                 <img src="${summary[i].image_url}" alt="${summary[i].title}" />
                </div>
              </div>
            </a>`;
        }
        htmlCode += "<div class='wpm-6310-hide-service'>Hide</div>";
        jQuery(".wpm-6310-services-summary").append(htmlCode);
      }

      //details
      htmlCode = "";
      if (details.length && jQuery(".wpm-6310-service-details").length) {
        for (let i = 0; i < details.length; i++) {
          let list = "",
            image_url = "";
          if (details[i].package.length) {
            for (let j = 0; j < details[i].package.length; j++) {
              list += `
              <div class="our-service-list">
                <svg width="11" height="9" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg"><path d="M3.64489 8.10164L0.158292 4.61504C-0.0511769 4.40557 -0.0511769 4.06594 0.158292 3.85645L0.916858 3.09786C1.12633 2.88837 1.46598 2.88837 1.67545 3.09786L4.02419 5.44658L9.05493 0.41586C9.2644 0.206391 9.60405 0.206391 9.81352 0.41586L10.5721 1.17445C10.7816 1.38392 10.7816 1.72355 10.5721 1.93303L4.40348 8.10166C4.19399 8.31113 3.85436 8.31113 3.64489 8.10164V8.10164Z"></path>
                </svg>
                ${details[i].package[j]}
            </div>
              `;
            }
          }
          if (details[i].image_url.length) {
            for (let j = 0; j < details[i].image_url.length; j++) {
              let active = j ? "" : " wpm-6310-service-image-active";
              image_url += `<img src="${details[i].image_url[j]}" class="wpm-6310-service-image${active}" alt="${details[i].title}" data-id='${j}'>`;
            }
          }
          if (details[i].image_url.length > 1) {
            image_url += `<div class="wpm-6310-icon-1"><i class="fas fa-chevron-right"></i></div>
                          <div class="wpm-6310-icon-2"><i class="fas fa-chevron-left"></i></div>`;
          }
          htmlCode += `
          <div class="wpm-6310-col-3">
            <a href="${details[i].url}" class="wpm-6310-container" target="_blank">
              <div class="wpm-6310-banner">${image_url}</div>
              <div class="wpm-6310-content">
                <div class="wpm-6310-price-box-wrapper">
                  <div class="wpm-6310-price-title">
                  STARTING AT
                  </div>
                  <div class="wpm-6310-price">${details[i].price}</div>
                </div>
                <div class="wpm-6310-content-title">${details[i].title}</div>
                <div class="our-service-list-wrapper">${list}</div>
              </div>
            
            </a>
          </div>
          `;
        }
        jQuery(".wpm-6310-service-details").append(htmlCode);
        jQuery(".wpm-6310-col-3 .wpm-6310-service-image:first-child").show();
      }
    }
  );

  jQuery("body").on("click", ".wpm-6310-icon-1", function (event) {
    event.preventDefault();
    let totalImage =
      jQuery(this).closest(".wpm-6310-banner").find("img").length - 1;
    let id = jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image-active")
      .attr("data-id");
    id = parseInt(id) + 1;
    if (id > totalImage) {
      id = 0;
    }
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image")
      .removeClass("wpm-6310-service-image-active");
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(`.wpm-6310-service-image[data-id="${id}"]`)
      .addClass("wpm-6310-service-image-active");
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image")
      .fadeOut(0);
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(`.wpm-6310-service-image[data-id="${id}"]`)
      .fadeIn(300);
  });

  jQuery("body").on("click", ".wpm-6310-icon-2", function (event) {
    event.preventDefault();
    let totalImage =
      jQuery(this).closest(".wpm-6310-banner").find("img").length - 1;
    let id = jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image-active")
      .attr("data-id");
    id = parseInt(id) - 1;
    if (id < 0) {
      id = totalImage;
    }
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image")
      .removeClass("wpm-6310-service-image-active");
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(`.wpm-6310-service-image[data-id="${id}"]`)
      .addClass("wpm-6310-service-image-active");
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(".wpm-6310-service-image")
      .fadeOut(0);
    jQuery(this)
      .closest(".wpm-6310-banner")
      .find(`.wpm-6310-service-image[data-id="${id}"]`)
      .fadeIn(300);
  });
});


function wpm_6310_toggle_service(){
  jQuery("body").on("click", ".wpm-6310-hide-service", function () {
    
    if (!confirm("Do you want to hide ads?")){
      return false;
    }
    jQuery('.wpm-6310-services-summary').hide();
    jQuery.getJSON(ajaxurl, {action: "wpm_6310_toggle_service"}, function() {});
  });
}

