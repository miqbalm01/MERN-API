function hitungTarif($durasi, $lokasiPenelepon, $lokasiPenerima, $paket) {
    $tarifDasar = array(25, 20, 15);
    $tarif = null;

    if ($durasi <= 30) {
        $tarif = $tarifDasar[0] * $durasi;
    } elseif ($durasi <= 120) {
        $tarif = $tarifDasar[0] * 30 + $tarifDasar[1] * ($durasi - 30);
    } else {
        $tarif = $tarifDasar[0] * 30 + $tarifDasar[1] * (120 - 30) + $tarifDasar[2] * ($durasi - 120);
    }

    if ($lokasiPenelepon === $lokasiPenerima) {
        $tarif *= 1;
    } else {
        $tarif *= 1.25;
    }

    if ($paket === "HALO Max") {
        $tarif *= 0.9;
    } elseif ($paket === "HALO Nasional") {
        $tarif *= 0.8;
        if ($lokasiPenelepon !== $lokasiPenerima) {
            $tarif -= $tarifDasar[0] * 30;
        }
    } elseif ($paket === "SUPER Kuota") {
        echo "Selamat anda mendapatkan bonus internet 100GB";
    }

    return $tarif;
}

$bapakAndi = hitungTarif(5 * 60, "Jakarta", "Yogyakarta", "HALO Max");
$bapakBudi = hitungTarif(5 * 60, "Jakarta", "Yogyakarta", "HALO Nasional");

echo "Tarif Pak Andi: " . number_format($bapakAndi, 2) . PHP_EOL;
echo "Tarif Pak Budi: " . number_format($bapakBudi, 2) . PHP_EOL;
?>