import mirador from 'mirador';

import { MiradorLdnPlugin } from '../../src'

const config = {
  id: 'demo',
  manifests: {
    'https://www.e-codices.unifr.ch/metadata/iiif/kba-WettF0015/manifest.json':{},
    'http://iiif.biblissima.fr/gallica/btv1b10510321r/manifest.json':{}
  },
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
