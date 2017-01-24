/**
 * Created by zJJ on 7/12/2016.
 */
const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
const ks = prp.keystone;

var Shop = new ks.List('Shop', {
    autokey: {from: 'chinese', path: 'key', unique: true},
    map: {name: 'chinese'},
    watch: {
      chinese: {
        onRemoveTarget: function (target) {
          console.log('Oh noes! I lost my author!');
        }
      }
    }
  }
);
Shop.add({
  createtime: {type: E.Datetime, noedit: true, default: Date.now},
  inoperation: {type: E.Boolean, label: '放假中'},
  likecount: {type: E.Number, label: "Like COUNTS"},
  loc: {type: E.GeoPoint, defaults: {country: 'Japan'}},
  chinese: {type: E.Text, initial: true, index: true, required: true, label: '方名'},
  english: {type: E.Text, initial: true, label: 'AD LINE'},
  state: {type: E.Select, options: prp.arr_status, default: prp.arr_status[0]},
  number: {type: E.Number, label: '電話'},
  languages: {
    label: '語言', type: E.Select, options: prp.arr_languages,
    many: true
  },
  country: {
    label: '國籍', type: E.Select, options: prp.arr_countries
  },
  locationdistrict: {
    label: 'District',
    type: E.Select,
    options: prp.fnList_locations
  },
  locationstreet: {
    label: '專用街道地址', type: String
  },
  features: {type: E.Relationship, label: '招式武器', ref: 'Feature', many: true, initial: true},
  schedule: {type: String, label: '時間表'},
  brief: {type: E.Html, wysiwyg: true, height: 150},
  photo: {type: E.CloudinaryImages, label: '自拍寫真'},
  photofeature: {type: E.CloudinaryImages, label: '專賣區之相'},
  photoprofile: {type: E.CloudinaryImage, label: '頭像', autoCleanup: true}
});
//Shop.relationship({ref: 'Profile', path: 'profiles', refPath: 'wp', label: 'Office Location'});
Shop.defaultColumns = 'chinese, state|15%, likecount|5%, createtime|10%';
Shop.register();