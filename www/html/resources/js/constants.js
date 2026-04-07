// GeoJson URLパス
export const GEOJSON_URL = 'https://raw.githubusercontent.com/dataofjapan/land/master/tokyo.geojson';

// 23区の区分色定義
export const WARD_COLORS = {
    '千代田区':'#FF8A80', '中央区':'#FF6D00',  '港区':'#FFAB40',
    '新宿区':'#FFD740',   '文京区':'#CCFF90',  '台東区':'#69F0AE',
    '墨田区':'#40C4FF',   '江東区':'#448AFF',  '品川区':'#7C4DFF',
    '目黒区':'#E040FB',   '大田区':'#FF4081',  '世田谷区':'#F48FB1',
    '渋谷区':'#CE93D8',   '中野区':'#80DEEA',  '杉並区':'#A5D6A7',
    '豊島区':'#FFF59D',   '北区':'#FFCC80',    '荒川区':'#80CBC4',
    '板橋区':'#90CAF9',   '練馬区':'#C5E1A5',  '足立区':'#BCAAA4',
    '葛飾区':'#EF9A9A',   '江戸川区':'#B0BEC5',
};

// マップのスタイル設定
export const MAP_STYLES = [
    // POI（施設アイコン）をすべて非表示
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    // 自然アイコンを非表示
    { featureType: "landscape.natural", elementType: "labels.icon", stylers: [{ visibility: "off" }], },
    // 交通機関アイコンも非表示
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    // 道路のアイコンを非表示（名前は残す）
    { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    // 道路を細く・薄く
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#f0f0f0" }] },
    // 水域を淡いブルーに
    { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#c8dcf0" }] },
    // 地名を薄く
    { featureType: "all", elementType: "labels.text.fill", stylers: [{ lightness: 60 }], },
    // 縁取りも背景色に合わせる
    { featureType: "all", elementType: "labels.text.stroke", stylers: [{ lightness: 60 }], },
    // 行政区分ラベルを薄く
    { featureType: "administrative.locality", elementType: "labels.icon", stylers: [{ lightness:  80 }], },
];