(function() {
  'use strict';

  iStreamApp.factory('util', util);

  function util(
  ) {

    var douyuADList = [
      "#chat-top-ad",
      ".chat-top-ad",
      ".sign_posid",
      "#dy_bottom_shadow",
      ".chat-right-ad",
      ".lol-ad",
      ".assort-ad",
      "div[data-type='sign']",
      "div[data-type='dyrec']",
      ".bglink",
      ".room-ad-top",
      "#js-live-room-normal-equal-left",
      ".rec"
    ];

    var douyuDarkList = {
    addClass: [
      { selector: "#room_container", cssClass: "is-dark-5" },
      { selector: "#live_userinfo", cssClass: "is-dark-4" },
      { selector: ".headline h1", cssClass: "is-dark-font-color" },
      { selector: ".redcolor", cssClass: "is-dark-font-color" },
      { selector: "#room_tags", cssClass: "is-dark-font-color" },
      { selector: ".room_mes .r_else_tips dd a", cssClass: "is-dark-font-color" },
      { selector: "#live_videobar", cssClass: "is-dark-4" },
      { selector: "#header", cssClass: "is-dark-4" },
      { selector: "#header a", cssClass: "is-dark-font-color-lighter" },
      { selector: ".text_cont", cssClass: "is-dark-font-color-lighter" },
      { selector: "#js_chat_mem", cssClass: "is-dark-4" },
      { selector: ".chat_mem_t", cssClass: "is-dark-4" },
      { selector: ".m_cnt a", cssClass: "is-dark-font-color" },
      { selector: "#broadcast_div", cssClass: "is-dark-4" },
      { selector: ".chat-n-tit h3", cssClass: "is-dark-font-color" },
      { selector: ".chat-live-rec .title h3", cssClass: "is-dark-font-color" },
      { selector: ".chat-live-rec .cont ul li a .txt h4", cssClass: "is-dark-font-color" },
      { selector: ".js_share_box_1", cssClass: "is-dark-5" },
      { selector: "#js_share_more1", cssClass: "is-dark-4" },
      { selector: ".app_box", cssClass: "is-dark-4" },
      { selector: ".cq_list ul li", cssClass: "is-dark-4" },
      { selector: "#cqf_but", cssClass: "is-dark-5" },
      { selector: "#details_div", cssClass: "is-dark-5" },
      { selector: ".chat_cls a", cssClass: "is-dark-5" },
      { selector: ".lw_item_hovercont", cssClass: "is-dark-5" },
      { selector: "#mainbody", cssClass: "is-dark-5" },
      { selector: "#live-list-content", cssClass: "is-dark-5" },
      { selector: ".play-list li .mes", cssClass: "is-dark-4" },
      { selector: ".play-list li a", cssClass: "is-dark-noborder" },
      { selector: ".play-list li .mes-tit h3", cssClass: "is-dark-font-color" },
      { selector: ".tse-content", cssClass: "is-dark-4" },
      { selector: ".broadcast-meta .info .title", cssClass: "is-dark-font-color" },
      { selector: ".tag_list ul li a", cssClass: "is-dark-font-color" },
      { selector: ".head-nav .assort .a-pop", cssClass: "is-dark-4" },
      { selector: ".head-nav .assort .a-list .btns li a", cssClass: "is-dark-5" },
      { selector: ".head .game_cas .game_btn a", cssClass: "is-dark-5" },
      { selector: ".head-nav .assort .a-list>h3", cssClass: "is-dark-font-color" },
      { selector: ".item-data .unit .title", cssClass: "is-dark-4" },
      { selector: ".row .row-top .t-tag a", cssClass: "is-dark-4" },
      { selector: ".hot-recom li", cssClass: "is-dark-4" },
      { selector: ".hot-word", cssClass: "is-dark-4" },
      { selector: ".poptip", cssClass: "is-dark-4" },
      { selector: ".m_list", cssClass: "is-dark-4" },
      { selector: ".classify-li ul li a", cssClass: "is-dark-font-color" },
      { selector: ".classify_li ul li a", cssClass: "is-dark-font-color" },
      { selector: ".row a", cssClass: "is-dark-font-color" },
      { selector: ".hot-recom li .text", cssClass: "is-dark-font-color" },
      { selector: ".head-oth .o-history .h-list>li", cssClass: "is-dark-4" },
      { selector: ".stats-and-actions", cssClass: "is-dark-4" },
      { selector: ".chat-member", cssClass: "is-dark-4" },
      { selector: ".live-room-normal-right", cssClass: "is-dark-4" },
      { selector: "#anchor-info", cssClass: "is-dark-4" },
      { selector: ".chat-speak", cssClass: "is-dark-4" },
      { selector: ".fans-list .f-tit ul li.cur", cssClass: "is-dark-4" },
      { selector: ".fans-list .f-tit ul li", cssClass: "is-dark-4" },
      { selector: ".fans-rank .fans-list", cssClass: "is-dark-4" },
      { selector: ".chat-notice p", cssClass: "is-dark-4" },
      { selector: ".chat-cont", cssClass: "is-dark-4" },
      { selector: ".lw-item-hovercont", cssClass: "is-dark-4" },
      { selector: ".qrcode-box .con, .share-box .con", cssClass: "is-dark-4" },
      { selector: ".give-gift .g-list li .lw-item-hover .text p strong", cssClass: "is-dark-font-color" },
      { selector: "#anchor-info a", cssClass: "is-dark-font-color" },
      { selector: "#anchor-info i", cssClass: "is-dark-font-color" },
      { selector: "#anchor-info li", cssClass: "is-dark-font-color" }
    ],
    attr: [
      { selector: "#live_userinfo", style: 'background-color: #424242 !important' },
      { selector: ".r_else li", style: 'color: #9E9E9E !important' },
      { selector: "#chat_lines", style: 'background-color: black !important' },
      { selector: ".m_cnt", style: 'background-color: #757575 !important' },
      { selector: ".c_speak", style: 'background-color: #212121 !important' },
      { selector: ".cq_fans .m_list .m_nav ul li.activ a", style: 'color: #9E9E9E !important' }
    ]
  };

    var service = {
      getCurrentSite: getCurrentSite,
      douyuADList: douyuADList,
      douyuDarkList: douyuDarkList
    };

    return service;

    function getCurrentSite () {
      return window.location.hostname.split('.')[1];
    }

  }
})();