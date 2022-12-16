import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ErrorContext } from "../context/ErrorContext";

/**
 *
 * @param service the service to call
 * @param body body to send the servioce
 * @param dependencies dependencies for useEffect
 * @param runOnMount should this run on mount. default to true
 * @returns data
 * @returns loading
 * @returns error
 */
export const useAuthenticatedFetch = (
  service: (...args: any) => Promise<any>,
  dependencies: any[],
  runOnMount: boolean = true,
  body?: Object
) => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldRun, setShouldRun] = useState<boolean>(false);

  const dispatchCallback = async () => {
    setLoading(true);
    try {
      let res = await service(body, auth?.token);
      setData(res.res);
    } catch (err: any) {
      setError(err?.message as string);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (runOnMount || shouldRun) {
      dispatchCallback();
    }
    setShouldRun(true);
  }, [...dependencies]);

  return { data, loading, error };
};
