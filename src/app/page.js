import { headers } from "next/headers";
import Card from "./(components)/Card";
import Link from "next/link";

// Proje geliştirme sürecinde farklı portlarda veya yayınlandıktan sonra farklı host adresinde çalışabilceğinden istek atılan API adresini dinamik yaptık
const host = headers().get("host");
const protocol = headers().get("x-forwarded-proto");
export const baseUrl = `${protocol}://${host}`;

const getData = async () => {
  try {
    const res = await fetch(`${baseUrl}/api/vehicles`);

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <p className="header text-2xl font-bold">CAR BAZAAR</p>
      </div>

      {/* Ürünler */}
      <div className="container">
        {data?.data.map((vehicle) => (
          <Card vehicle={vehicle} key={vehicle._id} baseUrl={baseUrl} />
        ))}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full flex justify-center bg-gradient-to-t from-black via-black h-20">
        <Link className="p-8 hover:text-gray-400 transition" href="/orders">
          My Orders
        </Link>
      </footer>
    </main>
  );
}
