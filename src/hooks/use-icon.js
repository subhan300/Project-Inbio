import { useEffect, useRef, useState } from "react";

function useDynamicIconImport(name, options = {}) {
    const ImportedIconRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [resIcon, setresIcon] = useState("");

    const [error, setError] = useState();

    const { onError } = options;

    useEffect(() => {
        setLoading(true);
        const importIcon = async () => {
            try {
                const loadIcon = await import(`react-feather`);
                const resIcon = await loadIcon[name];
                ImportedIconRef.current = resIcon;
                setresIcon(resIcon);

                console.log(ImportedIconRef.current);
                if (!ImportedIconRef.current) {
                    const { default: namedImport } = await import(
                        `../assets/fonts/${name}.svg`
                    );
                    ImportedIconRef.current = namedImport;
                }
            } catch (err) {
                console.log("err", err);
                if (onError) {
                    onError(err);
                }
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        importIcon();
    }, [name, error]);

    return { error, loading, SvgIcon: resIcon };
}

export default useDynamicIconImport;
