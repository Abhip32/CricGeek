$(document).ready(function () {
    $("ul.navbar-nav > li").click(function (e) {
     $("ul.navbar-nav > li").removeClass("active");
     $(this).addClass("active");
      });
  });

$('.nav-pills .nav-link').on('click',(function() {
      console.log("ads")
      // Remove active class from all links
      $('.nav-pills .nav-link').removeClass('active');
      
      // Add active class to the clicked link
      $(this).addClass('active');
      
      // Hide all tab content
      $('.tab-pane').removeClass('show active');
      
      // Show the corresponding tab content based on data-target attribute
      $($(this).data('target')).addClass('show active');
    }));



  