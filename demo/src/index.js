import mirador from 'mirador';

import { MiradorLdnPlugin } from '../../src'

const config = {
  id: 'demo',
  windows: [{
    loadedManifest: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'
  }],
  theme: {
    palette: {
      primary: {
        main: '#1967d2'
      }
    }
  }
}

const miradorInstance = mirador.viewer(config, [
  MiradorLdnPlugin,
]);
