import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js';

class VideoListView extends LitElement {
  static get properties() {
    return {
      change: {
        type: Boolean,
        value: false
      },
      videoid: {
        type: Number
      },
      videosInfo: {
        type: Array
      }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ul {
        list-style-type: none;
      }

      ul li span:first-of-type {
        display: inline-block;
        width: 27em;
      }

      ul li span:nth-of-type(2) {
        display: inline-block;
        width: 20em;
      }
      
      li {
        padding: 14px 4%;
        margin: 7px 0;
        border: 1px solid rgb(212, 212, 212);
        box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 1px -2px rgba(0, 0, 0, 0.0);
      }

      button {
        text-align: inherit;
        font-size: inherit;
        width: 100%;
        text-decoration: none;
        background: none;
        border: none;
      }

      button:link, button:visited {
        font-weight: normal;
      }

      button:hover, button:active {
        font-weight: bold;
      }

      span.black {
        color: #000;
      }

      span.gray {
        color: rgb(165, 165, 165);
      }
      
      /* style from shared-styles */
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }
    `;
  }

  constructor() {
    super();
    this.videosInfo = []
    fetch(`${window.MyAppGlobals.serverURL}api/videoList.php`)
      .then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(data => {
        this.videosInfo = data;
      })
  } // constructor

  render() {
    return html`
      <div class="card">
        <h1>Videoer</h1>
        <p>Refresh siden hvis du nylig har lastet opp en video</p>
        <ul>
          ${this.videosInfo.map(vidInfo => {
            return html`
              <button type="button" name="video" @click="${() => {
                // save id value in localStorage so it doesn't reset when we arrive at video-page 
                localStorage.setItem('id', vidInfo.id)                
                location.href = 'video' // head user to video page
              }}">
                <li>
                  <span class="black">${vidInfo.title}</span><br>
                  <span class="gray">${vidInfo.course}, ${vidInfo.topic}</span>
                </li>
              </button>
            `;
          })}
        </ul>
      </div>
    `;
  }

  /**
   * Create a promise that will resolve after the given time.
   *
   * @param  Number sec how long (in seconds) to wait before resolving the promise
   * @return Promise will be resolved when the desired time has passed
   */
  timer(sec) {
    return new Promise((resolve, reject) => {
      window.setTimeout(resolve, sec * 1000);  // Resolve when time has passed
    });
  }

}

customElements.define('video-list-view', VideoListView);