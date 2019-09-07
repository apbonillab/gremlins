function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
      horde.stop();
      callback();
  }
  var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  
 window.gremlins.createHorde()
  .allGremlins()
  .gremlin(function() {
    var forms = document.querySelectorAll('form');
    var formElement = forms[Math.floor(Math.random()*forms.length)];
   
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('submit');
    formElement.dispatchEvent(evt); 
    console.log('gremlin submit ', formElement);
  })
  .gremlin(gremlins.species.clicker().clickTypes(['click'])//botones y links
    .canClick((element) => {
      console.log(":->  "+element.tagName);
      return element.tagName.toLowerCase() === 'a' || element.tagName.toLowerCase() === 'button';
  }))
  .unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(100000);
    
    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);
    browser.click('button=Ingresar');
    browser.executeAsync(unleashGremlins, 5000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});