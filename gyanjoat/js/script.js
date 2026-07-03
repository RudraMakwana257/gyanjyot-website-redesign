(function () {
  'use strict';

  // ===== 1. STICKY HEADER SCROLL ACTION =====
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        document.body.classList.add('body-scrolled');
      } else {
        document.body.classList.remove('body-scrolled');
      }
    });
  }

  // ===== 2. MOBILE BURGER NAVIGATION TOGGLE =====
  var toggle = document.getElementById('navbarToggle');
  var menu = document.getElementById('navMenu');
  var overlay = document.getElementById('navOverlay');

  function closeDrawer() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('open');
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function openDrawer() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('open');
    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) { closeDrawer(); } else { openDrawer(); }
    });

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ===== 3. STAY IN TOUCH / NOTICES TAB TRIGGER =====
  var noticeTabs = document.querySelectorAll('.notices-tab-trigger');
  var noticeLists = document.querySelectorAll('.notices-list-container');
  if (noticeTabs.length && noticeLists.length) {
    noticeTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetTabId = this.getAttribute('data-tab');
        
        noticeTabs.forEach(function (t) { t.classList.remove('active'); });
        noticeLists.forEach(function (l) { l.classList.remove('active'); });
        
        this.classList.add('active');
        var targetList = document.getElementById(targetTabId);
        if (targetList) targetList.classList.add('active');
      });
    });
  }

  // ===== 4. ADMISSION DETAIL TABS =====
  var admTabs = document.querySelectorAll('.admission-tab-trigger');
  var admGrids = document.querySelectorAll('.admission-cards-grid');
  if (admTabs.length && admGrids.length) {
    admTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var targetGridId = this.getAttribute('data-admission-tab');
        
        admTabs.forEach(function (t) { t.classList.remove('active'); });
        admGrids.forEach(function (g) { g.style.display = 'none'; });
        
        this.classList.add('active');
        var targetGrid = document.getElementById(targetGridId);
        if (targetGrid) targetGrid.style.display = 'grid';
      });
    });
  }

  // ===== 5. PROGRAMMES "FIND YOUR WAY" FILTER =====
  var wayBtns = document.querySelectorAll('.wayfinder-tab-btn');
  var wayCards = document.querySelectorAll('.wayfinder-program-card');
  if (wayBtns.length && wayCards.length) {
    wayBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');
        
        wayBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        
        wayCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== 6. LIVE COURSE SEARCH & PILLED FILTER =====
  var searchInput = document.getElementById('courseSearchInput');
  var courseFilterBtns = document.querySelectorAll('.course-pill-btn');
  var courseCards = document.querySelectorAll('.catalog-course-card');
  var noResultsMsg = document.getElementById('noResultsMsg');
  var searchSubmitBtn = document.getElementById('btnCourseSearchSubmit');

  var currentCourseFilter = 'all';

  function filterCourses() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visibleCount = 0;

    courseCards.forEach(function (card) {
      var category = card.getAttribute('data-category');
      var title = card.querySelector('.catalog-card-title').textContent.toLowerCase();
      var desc = card.querySelector('.catalog-card-desc').textContent.toLowerCase();
      
      var matchesFilter = (currentCourseFilter === 'all' || category === currentCourseFilter);
      var matchesSearch = (!query || title.indexOf(query) !== -1 || desc.indexOf(query) !== -1);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCourses);
  }

  if (courseFilterBtns.length) {
    courseFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        courseFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        currentCourseFilter = this.getAttribute('data-course-filter');
        filterCourses();
      });
    });
  }

  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', function (e) {
      e.preventDefault();
      filterCourses();
    });
  }

  // ===== 7. COUNSELING ENQUIRY FORM VALIDATION & WHATSAPP EXPORT =====
  var form = document.getElementById('enquiryForm');
  var mobileInput = document.getElementById('mobile');
  
  if (mobileInput) {
    mobileInput.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, ''); // restrict input to numbers only
      if (this.value.length > 0 && this.value.length !== 10) {
        this.setCustomValidity('Enter a 10-digit mobile number.');
      } else {
        this.setCustomValidity('');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        if (el.hasAttribute('required')) {
          var errorSpan = document.getElementById(el.id + 'Error');
          
          if (!el.checkValidity()) {
            el.classList.add('error-state');
            if (errorSpan) errorSpan.textContent = el.validationMessage;
            valid = false;
          } else {
            el.classList.remove('error-state');
            if (errorSpan) errorSpan.textContent = '';
          }
        }
      });

      if (!valid) return;

      var courseLabels = {
        Foundation: 'IIT JEE Foundation (Class 9-10)',
        Mains: 'IIT JEE Mains (Class 11-12)',
        Advanced: 'IIT JEE Advanced'
      };

      var text = 'Hello Gyanjyot Institute, I would like to enquire about the upcoming batches.%0A%0A' +
        'Student Name: ' + encodeURIComponent(document.getElementById('studentName').value.trim()) + '%0A' +
        'Parent Name: ' + encodeURIComponent(document.getElementById('parentName').value.trim()) + '%0A' +
        'Mobile: ' + encodeURIComponent(document.getElementById('mobile').value.trim()) + '%0A' +
        'Class: ' + encodeURIComponent(document.getElementById('studentClass').value) + '%0A' +
        'Course Interest: ' + encodeURIComponent(courseLabels[document.getElementById('courseInterest').value] || document.getElementById('courseInterest').value);
      
      var msg = document.getElementById('message').value.trim();
      if (msg) text += '%0A%0AMessage: ' + encodeURIComponent(msg);

      window.open('https://wa.me/917575850099?text=' + text, '_blank');
      
      form.reset();
      form.querySelectorAll('.error-state').forEach(function (el) { el.classList.remove('error-state'); });
      form.querySelectorAll('.enquiry-error-msg').forEach(function (el) { el.textContent = ''; });
    });
  }

})();
