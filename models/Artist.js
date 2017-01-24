/**
 * Created by hesk on 17年1月24日.
 */

const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
const ks = prp.keystone;

var Artist = new prp.keystone.List('Artist', {
    autokey: {from: 'chinese', path: 'key', unique: true},
    map: {name: 'chinese'},
    // roles: ['performer'],
    watch: {
      chinese: {
        onRemoveTarget: function (target) {
          console.log('Oh noes! I lost my author!');
        }
      }
    }
  }
);


Artist.add({
  memberaccessid: {type: E.Text, noedit: true, label: 'Access by user'},
  createtime: {type: E.Datetime, noedit: true, default: Date.now},
  verified: {type: E.Boolean, label: 'Verified person'},
  followcount: {type: E.Number, label: "COUNTS of how many followers"},
  creationcount: {type: E.Number, label: "COUNTS of how many did this artist created so far"},
  native_name: {type: E.Text, initial: true, index: true, required: true, label: 'Native Name 方名'},
  intel_name: {type: E.Text, initial: true, label: 'English Name'},
  state: {type: E.Select, options: prp.arr_status, default: prp.arr_status[0]},
  languages: {
    label: '語言', type: E.Select, options: prp.arr_languages,
    many: true
  },
  country: {
    label: '國籍', type: E.Select, options: prp.arr_countries
  },
  search_key: {
    label: 'HashTags', type: E.Select, options: prp.arr_countries
  },
  photo: {type: E.CloudinaryImages, label: '自拍寫真'},
  born: {type: E.Date, label: 'DOB'},
  photofeature: {type: E.CloudinaryImages, label: '專賣區之相'},
  photoprofile: {type: E.CloudinaryImage, label: '頭像', autoCleanup: true},
  bio: {type: E.Html, wysiwyg: true, height: 150},
  wiki: {type: E.Url, label: 'WIKI bio', required: false},
  twitter: {type: E.Url, label: 'Twitter bio', required: false},
  linkedin: {type: E.Url, label: 'LinkedIn Bio', required: false},
  facebook: {type: E.Url, label: 'Facebook Bio', required: false}
});
Artist.defaultColumns = 'chinese, state|15%, access|6%, likecount|5%, createdAt|10%';
Artist.register();
