(function(window){
  'use strict'

  var bdbAdv = bdbAdv || {};

  bdbAdv = {
      offc: document.querySelector('#off-canvas')
    , main: document.querySelector('div[role="main"]')
    , initialize: function(){
        this.offcanvasListener();
        this.gallery.initialize();

        window.onrezise = function(){
          this.offcanvas();
        };
      }
    , offcanvas: function(){

      if(bdbAdv.main.style.left === '0px'){
        bdbAdv.main.setAttribute('style', 'left: ' + bdbAdv.offc.offsetWidth + 'px');
        bdbAdv.offc.setAttribute('style', 'left: 0');
      }
      else{
        bdbAdv.main.setAttribute('style', 'left: 0');
        bdbAdv.offc.setAttribute('style', 'left: -' + bdbAdv.offc.offsetWidth + 'px');
      }

    }
    , offcanvasListener: function(){
      var icon = document.querySelector('.menu');
      icon.addEventListener('click', this.offcanvas);

      bdbAdv.main.setAttribute('style', 'left: 0');
    }
    , showoff: function(){
      this.offc.setAttribute('style', 'left: -' + this.offc.offsetWidth + 'px');
    }
    , gallery : {
      initialize: function(){
        this.overlay = document.querySelector('.overlay') || null;
        this.lightbox = document.querySelector('.lightbox') || null;
        this.gallery = document.querySelectorAll('#gallery a') || null;
        this.h4 = this.lightbox.querySelector('h4') || null;
        this.p = this.lightbox.querySelector('p') || null;
        this.next = this.lightbox.querySelector('#gallery-next') || null;
        this.prev = this.lightbox.querySelector('#gallery-prev') || null;
        this.allNodes = document.querySelectorAll('#pictures li').length - 1 || null;
        this.children = document.querySelector('#pictures ul').children || null;

        for (var i = 0; i < this.gallery.length; ++i) {
          this.gallery[i].addEventListener('click', function(e){
            this.showLightbox(e);
          }.bind(this));
        }

        this.draw.initialize();

        document.querySelector('.close').addEventListener('click', function(){
          this.hideLightbox();
        }.bind(this));

        this.prev.addEventListener('click', function(){
          this.getPrev();
        }.bind(this));

        this.next.addEventListener('click', function(){
          this.getNext();
        }.bind(this));

        document.addEventListener('keydown', function(e){
          if(!this.isPresenting) return;

          if(e.key === "Left" || e.which === 37){
            this.getPrev();
          }

          if(e.key === "Right" || e.which === 39){
            this.getNext();
          }

          if(e.key === "Esc" || e.which === 27){
            this.hideLightbox();
          }
          
        }.bind(this));

      }
      , overlay: null
      , lightbox: null
      , gallery: null
      , img: null
      , p: null
      , next: null
      , prev: null
      , h4: null
      , allNodes: null
      , current: null
      , children: null
      , isPresenting: false
      , index: function(node) {
        var children = node.parentNode.children;
        var num = 0;
        for (var i=0; i<children.length; i++) {
             if (children[i]==node) return num;
             if (children[i].nodeType==1) num++;
        }
        return -1;
      }
      , updateCurrent: function(target){
        this.current = this.index(target);
      }
      , getNext: function(){
        if(!(this.current === this.allNodes)) {
          this.displayImage(this.children[this.current + 1]);
        }
      }
      , getPrev: function(){
        if(!(this.current === 0)){
          this.displayImage(this.children[this.current - 1]);
        }
      }
      , displayNav: function(){
        if(!(this.current === 0)){
          this.prev.setAttribute('style', 'display: block');
        }
        else{
          this.prev.setAttribute('style', 'display: none');
        }

        if(!(this.current === this.allNodes)){
          this.next.setAttribute('style', 'display: block');
        }
        else {
          this.next.setAttribute('style', 'display: none');
        }
      }
      , displayImage: function(li){
          this.updateCurrent(li);
          var a = li.querySelector('a');
          var img = a.querySelector('img');

          var image = new Image();
          image.src = a.getAttribute('href');

          var lightboxImg = this.lightbox.querySelector('img');

          if(lightboxImg){
            this.lightbox.removeChild(lightboxImg);
          }
          this.h4.textContent = '';
          this.p.textContent = '';

          image.onload = function(){
            document.querySelector('.lightbox').insertBefore(image, this.h4);

            this.h4.textContent = img.getAttribute('title');
            this.p.textContent = img.getAttribute('data-description');
          }.bind(this);

          this.displayNav();
      }
      , showLightbox: function(e){
          e.preventDefault();
          this.isPresenting = true;

          this.overlay.setAttribute('style', 'z-index: 10; opacity: .9');
          this.lightbox.setAttribute('style', 'z-index: 11; opacity: .9;' );

          this.displayImage(e.currentTarget.parentNode);

      }
      , hideLightbox: function(){

        this.h4.innerHTML = '';
        this.p.innerHTML = '';
        
        this.overlay.setAttribute('style', 'z-index: -10; opacity: 0;');
        this.lightbox.setAttribute('style', 'z-index: -11; opacity: 0;');

        this.isPresenting = false;

      }
      , draw: {
          initialize: function(){
            var nodes = document.querySelectorAll('#pictures li');
            var img;

            for (var i = 0; i < nodes.length; ++i) {
              img = nodes[i].querySelector('img');
              this.inject(nodes[i], img.getAttribute('title'), 'h4');
              this.inject(nodes[i], img.getAttribute('data-description'), 'p');
            }

          }
        , inject: function(li, desc, tagname){
          var tag = document.createElement(tagname);
          tag.textContent = desc;

          li.appendChild(tag);
        }

      }
    }
  }

  window.bdbAdv = bdbAdv;
  window.bdbAdv.initialize();

}(window));