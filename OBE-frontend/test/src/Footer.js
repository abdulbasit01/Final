import React, { Component, Fragment } from "react";
export class Footer extends Component {
 
  render() {
    return (
        <React.Fragment>
            <footer class="page-footer font-small pt-4" style={{backgroundColor:"#b2b2b2",clear:'both',position:'relative',bottom:'0 !important',height:'320px',width:'100%',zIndex:"-10000"}}>
  <div class="container-fluid text-center text-md-left">
    <div class="row">
      <div class="col-md-6 mt-md-0 mt-3">
        <h5 class="text-uppercase">Latest NEWS</h5>
        <iframe width="450" height="200" src="https://www.youtube.com/embed/A_zWI6pr_y4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </div>

      <hr class="clearfix w-100 d-md-none pb-3"/>
      <div class="col-md-3 mb-md-0 mb-3">

        <h5 class="text-uppercase">Links</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Link 1</a>
          </li>
          <li>
            <a href="#!">Link 2</a>
          </li>
          <li>
            <a href="#!">Link 3</a>
          </li>
          <li>
            <a href="#!">Link 4</a>
          </li>
        </ul>

      </div>
      <div class="col-md-3 mb-md-0 mb-3">

        <h5 class="text-uppercase">Links</h5>

        <ul class="list-unstyled">
          <li>
            <a href="#!">Link 1</a>
          </li>
          <li>
            <a href="#!">Link 2</a>
          </li>
          <li>
            <a href="#!">Link 3</a>
          </li>
          <li>
            <a href="#!">Link 4</a>
          </li>
        </ul>

      </div>
    </div>

  </div>
  <div class="footer-copyright text-center py-3">© 2020 Copyright:
    <a href="https://www.pec.org.pk/">PEC</a>
  </div>
</footer>

        </React.Fragment>
    );
  }
}

export default Footer;
