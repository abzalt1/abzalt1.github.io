import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="bg-transparent text-black font-sans min-h-screen transition-colors duration-300 relative">
      <main className="mb-20 relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase hover:opacity-70 transition-opacity">
            <i className="ri-arrow-left-line"></i> На главную
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-12 tracking-tighter">Политика конфиденциальности</h1>
        
        <div className="space-y-8 text-lg font-medium opacity-80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">1. Общие положения</h2>
            <p>
              Настоящая политика конфиденциальности составлена в соответствии с требованиями законодательства и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных на сайте abzalt1.github.io (далее — Оператор).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">2. Какие данные мы собираем</h2>
            <p>
              На сайте могут собираться следующие данные с помощью сервисов веб-аналитики (например, Meta Pixel, Yandex Metrica, Google Analytics):
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>IP-адрес пользователя;</li>
              <li>Данные о типе браузера и операционной системе;</li>
              <li>Информация о действиях на сайте (клики по кнопкам мессенджеров, переходы между страницами);</li>
              <li>Файлы cookie (куки).</li>
            </ul>
            <p className="mt-4">
              Мы не собираем ваше имя, номер телефона или другие идентифицирующие данные напрямую, если вы сами не передали их при обращении в мессенджеры.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">3. Цели обработки данных</h2>
            <p>
              Собранные обезличенные данные используются исключительно для:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li>Улучшения работы сайта и его содержания;</li>
              <li>Аналитики посещаемости;</li>
              <li>Оптимизации таргетированной рекламы (ретаргетинг).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">4. Использование файлов Cookie и Пикселей</h2>
            <p>
              Сайт использует файлы cookie и аналогичные технологии отслеживания, такие как Meta Pixel. Использование сайта означает ваше согласие с их применением. Вы можете отключить cookie в настройках вашего браузера, однако это может повлиять на работу некоторых функций сайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase mb-4 text-black">5. Обратная связь</h2>
            <p>
              Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору через Telegram: <strong>@abzalt1</strong> или WhatsApp.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
