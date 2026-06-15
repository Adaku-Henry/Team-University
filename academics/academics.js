/* =============================================
   ACADEMICS.JS — Benchmark Business College
   Complete interactive functionality
   ============================================= */

(function () {
  "use strict";

  /* ─────────────────────────────────────────
     UTILITY: Wait for DOM
  ───────────────────────────────────────── */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {

    /* ═══════════════════════════════════════
       1. MOBILE NAVIGATION TOGGLE
    ═══════════════════════════════════════ */
    var hamburger  = document.getElementById("hamburger");
    var mobileMenu = document.getElementById("mobileMenu");

    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", function () {
        var isOpen = mobileMenu.style.display === "flex";
        mobileMenu.style.display = isOpen ? "none" : "flex";
        hamburger.setAttribute("aria-expanded", String(!isOpen));
      });

      // Close on outside click
      document.addEventListener("click", function (e) {
        if (
          mobileMenu.style.display === "flex" &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          mobileMenu.style.display = "none";
          hamburger.setAttribute("aria-expanded", "false");
        }
      });

      // Close on mobile link click
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileMenu.style.display = "none";
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ═══════════════════════════════════════
       2. NAVBAR SCROLL STATE
    ═══════════════════════════════════════ */
    var navbar = document.getElementById("navbar");
    var lastScrollY = 0;

    function handleNavScroll() {
      var scrollY = window.scrollY;
      if (navbar) {
        navbar.classList.toggle("scrolled", scrollY > 60);
      }
      lastScrollY = scrollY;
    }

    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll(); // run once on load

    /* ═══════════════════════════════════════
       3. BACK-TO-TOP BUTTON
    ═══════════════════════════════════════ */
    var backToTop = document.getElementById("backToTop");

    if (backToTop) {
      window.addEventListener("scroll", function () {
        backToTop.classList.toggle("visible", window.scrollY > 420);
      }, { passive: true });

      backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* ═══════════════════════════════════════
       4. HERO COUNTER ANIMATION
    ═══════════════════════════════════════ */
    var counters = [
      { id: "c1", target: 5000, suffix: "+"   },
      { id: "c2", target: 50,   suffix: "+"   },
      { id: "c3", target: 10,   suffix: "+"   },
      { id: "c4", target: 92,   suffix: "%"   }
    ];

    function animateCounter(el, target, suffix) {
      var duration = 2200;
      var steps    = 70;
      var step     = 0;
      var timer = setInterval(function () {
        step++;
        var value = Math.floor((target / steps) * step);
        if (step >= steps) {
          value = target;
          clearInterval(timer);
        }
        el.textContent = value.toLocaleString() + suffix;
      }, duration / steps);
    }

    var heroEl = document.querySelector(".hero");
    var countersRun = false;

    if (heroEl) {
      var heroObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !countersRun) {
          countersRun = true;
          counters.forEach(function (c) {
            var el = document.getElementById(c.id);
            if (el) animateCounter(el, c.target, c.suffix);
          });
          heroObserver.disconnect();
        }
      }, { threshold: 0.3 });
      heroObserver.observe(heroEl);
    }

    /* ═══════════════════════════════════════
       5. CAROUSEL DOTS SYNC
         (CSS drives the animation; JS syncs
          the indicator dots to match timing)
    ═══════════════════════════════════════ */
    var cdots        = document.querySelectorAll(".cdot");
    var totalSlides  = 6;  // original slides count
    var activeDot    = 0;
    var dotInterval  = 5000; // ms per slide

    if (cdots.length) {
      setInterval(function () {
        cdots[activeDot].classList.remove("active");
        activeDot = (activeDot + 1) % totalSlides;
        cdots[activeDot].classList.add("active");
      }, dotInterval);

      // Allow clicking dots (pauses CSS animation momentarily is not possible,
      // but we update the active indicator state)
      cdots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          cdots[activeDot].classList.remove("active");
          activeDot = i;
          cdots[activeDot].classList.add("active");
        });
      });
    }

    /* ═══════════════════════════════════════
       6. CAROUSEL DRAG-TO-SCROLL
    ═══════════════════════════════════════ */
    var carouselWrapper = document.querySelector(".carousel-wrapper");
    var carouselTrack   = document.getElementById("carouselTrack");

    if (carouselWrapper && carouselTrack) {
      var isDragging     = false;
      var startX         = 0;
      var scrollStart    = 0;

      carouselWrapper.addEventListener("mousedown", function (e) {
        isDragging  = true;
        startX      = e.pageX - carouselWrapper.offsetLeft;
        scrollStart = carouselWrapper.scrollLeft;
        // Pause CSS animation while dragging
        carouselTrack.style.animationPlayState = "paused";
      });

      carouselWrapper.addEventListener("mouseleave", function () {
        if (isDragging) {
          isDragging = false;
          carouselTrack.style.animationPlayState = "running";
        }
      });

      carouselWrapper.addEventListener("mouseup", function () {
        isDragging = false;
        carouselTrack.style.animationPlayState = "running";
      });

      carouselWrapper.addEventListener("mousemove", function (e) {
        if (!isDragging) return;
        e.preventDefault();
        var x    = e.pageX - carouselWrapper.offsetLeft;
        var walk = (x - startX) * 1.6;
        carouselWrapper.scrollLeft = scrollStart - walk;
      });

      // Touch support
      var touchStartX = 0;
      carouselWrapper.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
        carouselTrack.style.animationPlayState = "paused";
      }, { passive: true });

      carouselWrapper.addEventListener("touchend", function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          carouselWrapper.scrollLeft += diff * 1.4;
        }
        setTimeout(function () {
          carouselTrack.style.animationPlayState = "running";
        }, 1200);
      }, { passive: true });
    }

    /* ═══════════════════════════════════════
       7. PROGRAM FILTER BUTTONS
    ═══════════════════════════════════════ */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var programs   = document.querySelectorAll(".program-item");
    var noResults  = document.getElementById("noResults");
    var searchInput = document.getElementById("searchProgram");
    var activeFilter = "all";

    function applyFilters() {
      var query      = searchInput ? searchInput.value.toLowerCase().trim() : "";
      var visibleCount = 0;

      programs.forEach(function (card) {
        var catMatch  = activeFilter === "all" || card.classList.contains(activeFilter);
        var textMatch = card.innerText.toLowerCase().includes(query);
        var show      = catMatch && textMatch;

        card.style.display = show ? "flex" : "none";
        if (show) visibleCount++;
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
      }
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeFilter = btn.dataset.filter || "all";
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
      searchInput.addEventListener("keyup", applyFilters);
    }

    /* ═══════════════════════════════════════
       8. FAQ ACCORDION
    ═══════════════════════════════════════ */
    var accHeaders = document.querySelectorAll(".accordion-header");

    accHeaders.forEach(function (header) {
      header.addEventListener("click", function () {
        var isOpen    = header.classList.contains("open");
        var allHdrs   = document.querySelectorAll(".accordion-header");
        var allConts  = document.querySelectorAll(".accordion-content");

        // Close all
        allHdrs.forEach(function  (h) { h.classList.remove("open"); });
        allConts.forEach(function (c) { c.classList.remove("open"); });

        // If it wasn't open, open it
        if (!isOpen) {
          header.classList.add("open");
          var content = header.nextElementSibling;
          if (content) content.classList.add("open");
        }
      });
    });

    /* ═══════════════════════════════════════
       9. TESTIMONIALS SLIDER
    ═══════════════════════════════════════ */
    var testTrack  = document.getElementById("testTrack");
    var testDots   = document.getElementById("testDots");
    var prevBtn    = document.getElementById("testPrev");
    var nextBtn    = document.getElementById("testNext");

    if (testTrack) {
      var testCards   = testTrack.querySelectorAll(".test-card");
      var testTotal   = testCards.length;
      var testCurrent = 0;
      var testAuto;
      var allTdots    = testDots ? testDots.querySelectorAll(".tdot") : [];

      function getCardWidth() {
        var card = testTrack.querySelector(".test-card");
        if (!card) return 406;
        return card.offsetWidth + 26; // width + gap
      }

      function testGoTo(index) {
        testCurrent = ((index % testTotal) + testTotal) % testTotal;
        testTrack.style.transform = "translateX(-" + (testCurrent * getCardWidth()) + "px)";

        allTdots.forEach(function (d, i) {
          d.classList.toggle("active", i === testCurrent);
        });
      }

      function startTestAuto() {
        testAuto = setInterval(function () {
          testGoTo(testCurrent + 1);
        }, 5000);
      }

      function stopTestAuto() { clearInterval(testAuto); }

      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          stopTestAuto();
          testGoTo(testCurrent - 1);
          startTestAuto();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          stopTestAuto();
          testGoTo(testCurrent + 1);
          startTestAuto();
        });
      }

      // Dot clicks
      allTdots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          var idx = parseInt(dot.dataset.idx, 10);
          stopTestAuto();
          testGoTo(idx);
          startTestAuto();
        });
      });

      // Touch/swipe support
      var touchX = 0;
      var testWrapper = testTrack.parentElement;

      if (testWrapper) {
        testWrapper.addEventListener("touchstart", function (e) {
          touchX = e.touches[0].clientX;
        }, { passive: true });

        testWrapper.addEventListener("touchend", function (e) {
          var diff = touchX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 48) {
            stopTestAuto();
            testGoTo(diff > 0 ? testCurrent + 1 : testCurrent - 1);
            startTestAuto();
          }
        }, { passive: true });

        // Keyboard
        testWrapper.setAttribute("tabindex", "0");
        testWrapper.addEventListener("keydown", function (e) {
          if (e.key === "ArrowRight") { stopTestAuto(); testGoTo(testCurrent + 1); startTestAuto(); }
          if (e.key === "ArrowLeft")  { stopTestAuto(); testGoTo(testCurrent - 1); startTestAuto(); }
        });
      }

      // Recalculate on window resize
      window.addEventListener("resize", function () {
        testGoTo(testCurrent);
      }, { passive: true });

      startTestAuto();
    }

    /* ═══════════════════════════════════════
       10. REVEAL ON SCROLL (Intersection Observer)
    ═══════════════════════════════════════ */
    // Automatically add .reveal to card elements
    var revealTargets = document.querySelectorAll(
      ".school-card, .program-item, .research-card, .resource-card, .cal-item, .test-card"
    );
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });

    /* ═══════════════════════════════════════
       11. TICKER PAUSE ON FOCUS (Accessibility)
    ═══════════════════════════════════════ */
    var allTickers = document.querySelectorAll(".ticker-track, .ticker-rtl, .strip-events");

    allTickers.forEach(function (el) {
      el.addEventListener("focusin", function () {
        el.style.animationPlayState = "paused";
      });
      el.addEventListener("focusout", function () {
        el.style.animationPlayState = "running";
      });
    });

    /* ═══════════════════════════════════════
       12. SMOOTH ANCHOR SCROLL
    ═══════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var href = anchor.getAttribute("href");
        if (href === "#" || href === "") return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = 75; // navbar height
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });

    /* ═══════════════════════════════════════
       13. ACTIVE NAV SCROLL SPY
    ═══════════════════════════════════════ */
    var sections = document.querySelectorAll("section[id]");
    var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

    if (sections.length && navAnchors.length) {
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navAnchors.forEach(function (link) {
              var isActive = link.getAttribute("href") === "#" + entry.target.id;
              if (isActive) {
                link.style.color    = "var(--orange)";
                link.style.fontWeight = "700";
              } else {
                link.style.color    = "";
                link.style.fontWeight = "";
              }
            });
          }
        });
      }, { threshold: 0.45 });

      sections.forEach(function (sec) { spyObserver.observe(sec); });
    }

    /* ═══════════════════════════════════════
       14. SCHOOL CARD HOVER COLOUR (data-color)
    ═══════════════════════════════════════ */
    var schoolCards = document.querySelectorAll(".school-card[data-color]");
    schoolCards.forEach(function (card) {
      var color = card.dataset.color;
      card.addEventListener("mouseenter", function () {
        card.style.borderTopColor = color;
      });
      card.addEventListener("mouseleave", function () {
        card.style.borderTopColor = "";
      });
    });

    /* ═══════════════════════════════════════
       15. SECTION TITLES FADE-IN
    ═══════════════════════════════════════ */
    var sectionTitles = document.querySelectorAll(".section-title, .section-label, .section-sub");
    sectionTitles.forEach(function (el) {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(20px)";
      el.style.transition = "opacity .6s ease, transform .6s ease";
    });

    var titleObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "translateY(0)";
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sectionTitles.forEach(function (el) { titleObserver.observe(el); });

  }); // end ready()

})(); // end IIFE
