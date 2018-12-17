<template lang="pug">
  div(data-app)
    v-container
      v-layout(row, justify-center)
        v-flex(md8)
          v-data-table(:headers="headers", :items="pasiens", :loading="tableLoading"
            item-key="tanggal", class="elevation-1")
            v-progress-linear(slot="progress", color="blue", indeterminate)
            template(slot="items", slot-scope="props")
              tr
                td {{ (props.index + 1) }}
                td {{ props.item.nama }}
                td {{ props.item.email }}
                td {{ props.item.telp }}
                td
                  div
                    v-btn(depressed, style="backgrond-color: #81D4FA !important;", @click="props.expanded = !props.expanded") See Detail
            template(slot="expand" slot-scope="props")
              v-card(flat)
                v-card-text Umur : {{ props.item.umur }}
                v-card-text Berat Badan : {{ props.item.berat_badan }}
                v-card-text Gejala :
                  br
                  v-tooltip(v-for="(gejala, key) in props.item.gejala", :key="key", top)
                    v-chip(slot="activator") {{ gejala }}
                    span {{ getNamaGejala(gejala) }}
</template>

<script>
import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCBmzQFno5XKkqh6Cq-0EKsVRTbQrw5ejQ',
  authDomain: 'sparkcare-5e2bb.firebaseapp.com',
  databaseURL: 'https://sparkcare-5e2bb.firebaseio.com',
  projectId: 'sparkcare-5e2bb',
  storageBucket: 'sparkcare-5e2bb.appspot.com',
  messagingSenderId: '267466481680'
}

let app = Firebase.initializeApp(config)
let db = app.database()
let pasienRef = db.ref('pasien')

export default {
  name: 'App',
  firebase: {
    pasiens: {
      source: pasienRef,
      readyCallback: function () {
        this.tableLoading = false
      }
    },
    gejala: db.ref('gejala')
  },
  data () {
    return {
      tableLoading: true,
      headers: [
        { text: 'Nomor', value: '[.key]' },
        { text: 'Nama', value: 'nama' },
        { text: 'Alamat Email', value: 'email' },
        { text: 'Nomor Telepon', value: 'telp' },
        { text: 'Action', value: 'tanggal' }
      ]
    }
  },
  methods: {
    getNamaGejala (kode) {
      for (let i = 0; i < this.gejala.length; i++) {
        if (this.gejala[i]['.key'] === kode) {
          return this.gejala[i].nama
        }
      }
    }
  }
}
</script>

<style>
body {
  background-color: #ff0000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3CradialGradient id='a' cx='500' cy='500' r='60%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ff0000'/%3E%3Cstop offset='1' stop-color='%23900'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='500' cy='500' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23FF0' stop-opacity='1'/%3E%3Cstop offset='1' stop-color='%23FF0' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='1000' height='1000'/%3E%3Cg fill='none' stroke='%23F40' stroke-width='2' stroke-miterlimit='10' stroke-opacity='.5'%3E%3Ccircle cx='500' cy='500' r='725'/%3E%3Ccircle cx='500' cy='500' r='700'/%3E%3Ccircle cx='500' cy='500' r='675'/%3E%3Ccircle cx='500' cy='500' r='650'/%3E%3Ccircle cx='500' cy='500' r='625'/%3E%3Ccircle cx='500' cy='500' r='600'/%3E%3Ccircle cx='500' cy='500' r='575'/%3E%3Ccircle cx='500' cy='500' r='550'/%3E%3Ccircle cx='500' cy='500' r='525'/%3E%3Ccircle cx='500' cy='500' r='500'/%3E%3Ccircle cx='500' cy='500' r='475'/%3E%3Ccircle cx='500' cy='500' r='450'/%3E%3Ccircle cx='500' cy='500' r='425'/%3E%3Ccircle cx='500' cy='500' r='400'/%3E%3Ccircle cx='500' cy='500' r='375'/%3E%3Ccircle cx='500' cy='500' r='350'/%3E%3Ccircle cx='500' cy='500' r='325'/%3E%3Ccircle cx='500' cy='500' r='300'/%3E%3Ccircle cx='500' cy='500' r='275'/%3E%3Ccircle cx='500' cy='500' r='250'/%3E%3Ccircle cx='500' cy='500' r='225'/%3E%3Ccircle cx='500' cy='500' r='200'/%3E%3Ccircle cx='500' cy='500' r='175'/%3E%3Ccircle cx='500' cy='500' r='150'/%3E%3Ccircle cx='500' cy='500' r='125'/%3E%3Ccircle cx='500' cy='500' r='100'/%3E%3Ccircle cx='500' cy='500' r='75'/%3E%3Ccircle cx='500' cy='500' r='50'/%3E%3Ccircle cx='500' cy='500' r='25'/%3E%3C/g%3E%3Crect fill-opacity='.5' fill='url(%23b)' width='1000' height='1000'/%3E %3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
.info {
  background: #81D4FA;
}

</style>
