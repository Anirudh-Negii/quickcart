function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#242424] px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-lg font-bold text-orange-500">QuickCart</p>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} QuickCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
