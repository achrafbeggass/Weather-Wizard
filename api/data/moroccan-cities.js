const cities = [
  {
    id: 1,
    name: "Casablanca",
    lat: 33.5731,
    lon: -7.5898,
    imageUrl:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Rabat",
    lat: 34.0209,
    lon: -6.8416,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673415819362-c2ca640bfafe?q=80",
  },
  {
    id: 3,
    name: "Marrakech",
    lat: 31.6295,
    lon: -7.9811,
    imageUrl:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Fes",
    lat: 34.0333,
    lon: -5.0,
    imageUrl:
      "https://images.unsplash.com/photo-1548019979-e7c3c8b5c905?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Tangier",
    lat: 35.7595,
    lon: -5.834,
    imageUrl:
      "https://images.unsplash.com/photo-1553244323-d7c5cbf88c48?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Agadir",
    lat: 30.4202,
    lon: -9.5982,
    imageUrl:
      "https://images.unsplash.com/photo-1596627118111-5b6c7890bc1b?auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Meknes",
    lat: 33.8935,
    lon: -5.5547,
    imageUrl:
      "https://images.unsplash.com/photo-1570667871518-c98c6da8e197?auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "Oujda",
    lat: 34.6867,
    lon: -1.9114,
    imageUrl:
      "https://images.unsplash.com/photo-1577147442971-cf82af6c4c24?auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "Kenitra",
    lat: 34.261,
    lon: -6.5802,
    imageUrl:
      "https://images.unsplash.com/photo-1589221158826-aed5b6819d27?auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Tetouan",
    lat: 35.5889,
    lon: -5.3626,
    imageUrl:
      "https://images.unsplash.com/photo-1553244323-d7c5cbf88c48?auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Safi",
    lat: 32.2994,
    lon: -9.2372,
    imageUrl:
      "https://images.unsplash.com/photo-1590006198698-22643b00b60b?auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "El Jadida",
    lat: 33.2316,
    lon: -8.5007,
    imageUrl:
      "https://images.unsplash.com/photo-1579014811980-54b4160f35d5?auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    name: "Beni Mellal",
    lat: 32.3373,
    lon: -6.3497,
    imageUrl:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80",
  },
  {
    id: 14,
    name: "Nador",
    lat: 35.1667,
    lon: -2.9333,
    imageUrl:
      "https://images.unsplash.com/photo-1589221158826-aed5b6819d27?auto=format&fit=crop&q=80",
  },
  {
    id: 15,
    name: "Taza",
    lat: 34.21,
    lon: -4.01,
    imageUrl:
      "https://images.unsplash.com/photo-1590006198698-22643b00b60b?auto=format&fit=crop&q=80",
  },
  {
    id: 16,
    name: "Settat",
    lat: 33.0014,
    lon: -7.6167,
    imageUrl:
      "https://images.unsplash.com/photo-1577147443072-c391d45f6a11?auto=format&fit=crop&q=80",
  },
  {
    id: 17,
    name: "Khouribga",
    lat: 32.8805,
    lon: -6.9063,
    imageUrl:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80",
  },
  {
    id: 18,
    name: "Essaouira",
    lat: 31.5125,
    lon: -9.77,
    imageUrl:
      "https://images.unsplash.com/photo-1553244323-4c3bc71c6bea?auto=format&fit=crop&q=80",
  },
  {
    id: 19,
    name: "Mohammedia",
    lat: 33.6865,
    lon: -7.3848,
    imageUrl:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&q=80",
  },
  {
    id: 20,
    name: "Ouarzazate",
    lat: 30.92,
    lon: -6.8936,
    imageUrl:
      "https://images.unsplash.com/photo-1548019979-e7c3c8b5c905?auto=format&fit=crop&q=80",
  },
  {
    id: 21,
    name: "Al Hoceima",
    lat: 35.2517,
    lon: -3.9372,
    imageUrl:
      "https://images.unsplash.com/photo-1589221158826-aed5b6819d27?auto=format&fit=crop&q=80",
  },
  {
    id: 22,
    name: "Larache",
    lat: 35.1933,
    lon: -6.1562,
    imageUrl:
      "https://images.unsplash.com/photo-1590006198698-22643b00b60b?auto=format&fit=crop&q=80",
  },
  {
    id: 23,
    name: "Ksar El Kebir",
    lat: 35.0004,
    lon: -5.9,
    imageUrl:
      "https://images.unsplash.com/photo-1577147443072-c391d45f6a11?auto=format&fit=crop&q=80",
  },
  {
    id: 24,
    name: "Khemisset",
    lat: 33.8242,
    lon: -6.0658,
    imageUrl:
      "https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80",
  },
  {
    id: 25,
    name: "Guelmim",
    lat: 28.987,
    lon: -10.0574,
    imageUrl:
      "https://images.unsplash.com/photo-1548019979-e7c3c8b5c905?auto=format&fit=crop&q=80",
  },
  {
    id: 26,
    name: "Berrechid",
    lat: 33.2655,
    lon: -7.5877,
    imageUrl:
      "https://images.unsplash.com/photo-1577147443647-81856d5151af?auto=format&fit=crop&q=80",
  },
  {
    id: 27,
    name: "Taourirt",
    lat: 34.4173,
    lon: -2.8927,
    imageUrl:
      "https://images.unsplash.com/photo-1589221158826-aed5b6819d27?auto=format&fit=crop&q=80",
  },
  {
    id: 28,
    name: "Chefchaouen",
    lat: 35.1688,
    lon: -5.2636,
    imageUrl:
      "https://images.unsplash.com/photo-1553244323-d7c5cbf88c48?auto=format&fit=crop&q=80",
  },
  {
    id: 29,
    name: "Tan-Tan",
    lat: 28.4304,
    lon: -11.1028,
    imageUrl:
      "https://images.unsplash.com/photo-1590006198698-22643b00b60b?auto=format&fit=crop&q=80",
  },
  {
    id: 30,
    name: "Ifrane",
    lat: 33.5333,
    lon: -5.1,
    imageUrl:
      "https://images.unsplash.com/photo-1548019979-e7c3c8b5c905?auto=format&fit=crop&q=80",
  },
];

module.exports = cities;
