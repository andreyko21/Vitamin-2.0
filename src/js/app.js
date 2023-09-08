document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname;
  var pageElement = document.getElementById('pages');
  console.log(path);
  const pattern = /^\/product#\d+$/;
  if (pattern.test(path)) {
    SetPage('product', 'Product');
  } else {
    SetPage('404', '404');
  }

  function SetStyleFile(fileName) {
    var linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.type = 'text/css';
    linkTag.href = `./../css/${fileName}.min.css`;
    document.head.appendChild(linkTag);
  }

  function SetJsFile(fileName) {
    var scriptTag = document.createElement('script');
    scriptTag.src = `/js/${fileName}.min.js`;
    document.body.appendChild(scriptTag);
  }

  function SetHeadInfo(title) {
    document.title = title;
  }

  function SetPage(fileName, title) {
    loadPageContent(`/${fileName}`);
    SetStyleFile(fileName);
    SetJsFile(fileName);
    SetHeadInfo(title);
  }

  function loadPageContent(url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(function (data) {
        pageElement.innerHTML = data;
      })
      .catch(function (error) {
        pageElement.innerHTML = 'Error: ' + error.message;
      });
  }
});
