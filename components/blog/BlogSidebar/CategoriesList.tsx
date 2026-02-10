const CATEGORIES = [
    "Forensic Science",
    "Crime Scene Investigation",
    "Criminology & Victimology",
    "Cyber Security & Law",
    "DNA Fingerprinting",
    "Document Examination",
    "Fingerprint Analysis",
    "Forensic Accounting",
    "Forensic Anthropology",
  ];
  
  export default function CategoriesList() {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h4 className="mb-3 text-[20px] text-black font-semibold">Categories</h4>
        <div className="my-4 h-px bg-gray-200" />
  
        <ul className="space-y-2 text-[14px] font-regular">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              className="flex cursor-pointer items-center justify-between text-black hover:text-[#0B10A4] py-2"
            >
              {cat}
              <span className="text-[16px] text-black">›</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  